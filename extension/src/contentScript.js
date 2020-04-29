(function () {
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
		try {
			const response = await fetch(
				`https://api.trello.com/1/cards?idList=${params.idList}&key=${params.key}&token=${params.token}&name=${params.name}&desc=${params.desc}&urlSource=${params.urlSource}`,
				{ method: 'POST' }
			);
			await response.json();
		} catch (error) {
			console.log(error);
		}
	}

	async function notifyExtension(e) {
		if (e.altKey) {
			const name = document.title;
			const desc = getHref(e);
			const urlSource = desc;
			window.open(urlSource, '_blank');
			window.focus();

			const store = await browser.storage.local.get([
				'SAVE_LINK_LIST_ID',
				'SAVE_LINK_AUTH_TOKEN',
				'SAVE_LINK_AUTH_KEY',
			]);

			await createTrelloCard({
				name,
				desc,
				urlSource,
				idList: store.SAVE_LINK_LIST_ID,
				key: store.SAVE_LINK_AUTH_KEY,
				token: store.SAVE_LINK_AUTH_TOKEN,
			});
		}
	}

	window.addEventListener('click', notifyExtension);
})();
browser.runtime.onMessage.addListener((message) => console.log(message));
