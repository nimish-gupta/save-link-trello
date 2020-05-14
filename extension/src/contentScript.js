(function () {
	function checkLink(event) {
		return event.target.href !== null && event.target.href !== undefined;
	}

	function getHref(e) {
		let event = e || window.event;
		const href = event.target.getAttribute('href');
		const r = new RegExp('^(?:[a-z]+:)?//', 'i');

		if (r.test(href)) {
			return href;
		}
		return `${window.location.protocol}//${window.location.host}${
			href[0] === '/' ? href : '/' + href
		}`;
	}

	async function createTrelloCard(params) {
		const response = await fetch(
			`https://api.trello.com/1/cards?idList=${params.idList}&key=${params.key}&token=${params.token}&name=${params.name}&desc=${params.desc}&urlSource=${params.urlSource}`,
			{ method: 'POST' }
		);
		const card = await response.json();
		return card.id;
	}

	async function deleteTrelloCard(params) {
		const response = await fetch(
			`https://api.trello.com/1/cards/${params.id}?key=${params.key}&token=${params.token}`,
			{
				method: 'DELETE',
			}
		);
		await response.json();
	}

	async function deleteCard(e) {
		const event = window.event ? window.event : e;
		if (event.keyCode == 82 && event.altKey) {
			const href = window.location.href;
			const cardExists = await browser.storage.local.get(href);
			let msgType = 'success',
				msg = `Link is successfully deleted.`;
			if (cardExists[href] === undefined) {
				msgType = 'error';
				msg = `Link could not be deleted. You have to manually delete the link from trello.`;
			} else {
			}
			try {
				const store = await browser.storage.local.get([
					'SAVE_LINK_LIST_ID',
					'SAVE_LINK_AUTH_TOKEN',
					'SAVE_LINK_AUTH_KEY',
				]);
				await deleteTrelloCard({
					id: cardExists[href],
					key: store.SAVE_LINK_AUTH_KEY,
					token: store.SAVE_LINK_AUTH_TOKEN,
				});
				await browser.storage.local.remove(href);
			} catch (error) {
				msgType = 'error';
				msg = `Link, ${href} could not be deleted due to ${error.message}`;
			}
			return await browser.runtime.sendMessage({
				msg,
				link: href,
				type: msgType,
			});
		}
	}

	async function notifyExtension(e) {
		if (e.altKey) {
			const isLink = checkLink(e);
			const name = document.title;
			const desc = isLink ? getHref(e) : window.location.href;
			const urlSource = desc;

			const cardAlreadyExists = await browser.storage.local.get(urlSource);
			if (cardAlreadyExists[urlSource]) {
				return await browser.runtime.sendMessage({
					link: urlSource,
					type: 'error',
					error: 'link is already stored in the browser',
				});
			}
			try {
				if (isLink) {
					window.open(urlSource, '_blank');
					window.focus();
				}

				const store = await browser.storage.local.get([
					'SAVE_LINK_LIST_ID',
					'SAVE_LINK_AUTH_TOKEN',
					'SAVE_LINK_AUTH_KEY',
				]);

				const cardId = await createTrelloCard({
					name,
					desc,
					urlSource,
					idList: store.SAVE_LINK_LIST_ID,
					key: store.SAVE_LINK_AUTH_KEY,
					token: store.SAVE_LINK_AUTH_TOKEN,
				});
				await browser.storage.local.set({ [desc]: cardId });
				await browser.runtime.sendMessage({ link: urlSource });
			} catch (error) {
				await browser.runtime.sendMessage({
					link: urlSource,
					type: 'error',
					error: error.message,
				});
			}
		}
	}

	window.addEventListener('click', notifyExtension);
	document.onkeydown = deleteCard;
})();
browser.runtime.onMessage.addListener((message) => console.log(message));
