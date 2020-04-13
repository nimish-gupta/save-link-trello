function getCookie(cookies) {
	return function (name) {
		const [cookie] = cookies.filter((cookie) => cookie.name === name);
		return cookie ? (cookie.value ? cookie.value : undefined) : undefined;
	};
}

async function checkLogin() {
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
	const cookies = await browser.cookies.getAll({ url: 'http://localhost/api' });

	const cookieFetcher = getCookie(cookies);

	const token = cookieFetcher('SAVE_LINK_AUTH_TOKEN');
	const key = cookieFetcher('SAVE_LINK_AUTH_KEY');
	await browser.tabs.sendMessage(tab.id, { token, key });
	return token !== undefined && key === undefined;
}

function reportExecuteScriptError(error) {
	document.querySelector('#popup-content').classList.add('hidden');
	document.querySelector('#error-content').classList.remove('hidden');
	document.querySelector('#error-content').innerHTML = error;
}

function onSuccess() {
	const isLogin = checkLogin();

	const authenticateElem = document.querySelector('#authenticate');

	if (isLogin) {
		authenticateElem.classList.add('hidden');
	} else {
		authenticateElem.classList.remove('hidden');
	}

	authenticateElem.addEventListener('click', authenticateUser);
}

function authenticateUser() {
	window.open('http://localhost:3000/api/login');
}

browser.tabs
	.executeScript({ file: './contentScript.js' })
	.then(onSuccess)
	.catch(reportExecuteScriptError);
