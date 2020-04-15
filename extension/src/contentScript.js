(function () {
	async function notifyExtension(e) {
		if (e.altKey) {
			e = e || window.event;
			const store = await browser.storage.local.get([
				'SAVE_LINK_LIST_ID',
				'SAVE_LINK_AUTH_TOKEN',
				'SAVE_LINK_AUTH_KEY',
			]);
			const r = new RegExp('^(?:[a-z]+:)?//', 'i');
			let href = e.target.getAttribute('href');
			href = r.test(href)
				? href
				: `${window.location.protocol}//${window.location.host}${
						href[0] === '/' ? href : '/' + href
				  }`;

			const response = await fetch(
				`https://api.trello.com/1/cards?idList=${store.SAVE_LINK_LIST_ID}&key=${store.SAVE_LINK_AUTH_KEY}&token=${store.SAVE_LINK_AUTH_TOKEN}&name=${href}`,
				{ method: 'POST' }
			);
			await response.json();
		}
	}

	window.addEventListener('click', notifyExtension);
})();
browser.runtime.onMessage.addListener((message) => console.log(message));
