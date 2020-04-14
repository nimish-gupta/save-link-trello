(function () {
	async function notifyExtension(e) {
		if (e.altKey) {
			e = e || window.event;
			const store = await browser.storage.local.get([
				'SAVE_LINK_LIST_ID',
				'SAVE_LINK_AUTH_TOKEN',
				'SAVE_LINK_AUTH_KEY',
			]);
			return fetch(
				`https://api.trello.com/1/cards?idList=${store.SAVE_LINK_LIST_ID}&key=${
					store.SAVE_LINK_AUTH_KEY
				}&token=${store.SAVE_LINK_AUTH_TOKEN}&name=${e.target.getAttribute(
					'href'
				)}`,
				{ method: 'POST' }
			);
		}
	}

	window.addEventListener('click', notifyExtension);
})();
browser.runtime.onMessage.addListener((message) => console.log(message));
