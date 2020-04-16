async function getFromStorage(keys = []) {
	const store = await browser.storage.local.get(keys);
	return store;
}

function getCookie(cookies) {
	return function (name) {
		const [cookie] = cookies.filter((cookie) => cookie.name === name);
		return cookie ? (cookie.value ? cookie.value : undefined) : undefined;
	};
}

async function getFromCookies(keys = []) {
	const cookies = await browser.cookies.getAll({
		url: 'https://save-link-trello.herokuapp.com/api',
	});

	const cookieFetcher = getCookie(cookies);
	return keys.map((key) => cookieFetcher(key));
}

async function saveInLocalStorage(object) {
	await browser.storage.local.set(object);
}

async function clearLocalStorage() {
	await browser.storage.local.clear();
}

async function addDebugger(data) {
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
	if (tab) {
		await browser.tabs.sendMessage(tab.id, { data });
	}
}
