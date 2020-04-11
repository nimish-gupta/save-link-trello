function checkLogin() {
	const token = window.localStorage.getItem('TRELLO_SAVE_LINK_TOKEN');
	const key = window.localStorage.getItem('TRELLO_SAVE_LINK_KEY');
	return token !== undefined && key === undefined;
}

function reportExecuteScriptError(error) {
	document.querySelector('#popup-content').classList.add('hidden');
	document.querySelector('#error-content').classList.remove('hidden');
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
