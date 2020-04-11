function checkLogin() {
	const token = window.localStorage.getItem('TRELLO_SAVE_LINK_TOKEN');
	const key = window.localStorage.getItem('TRELLO_SAVE_LINK_KEY');
	return token !== undefined && key === undefined;
}

function reportExecuteScriptError(error) {
	document.querySelector('#popup-content').classList.add('hidden');
	document.querySelector('#error-content').classList.remove('hidden');
	console.error(`Failed to execute beastify content script: ${error.message}`);
}

function onSuccess() {
	const isLogin = checkLogin();

	const authenticateElem = document.querySelector('#authenticate');

	if (isLogin) {
		authenticateElem.classList.add('hidden');
	} else {
		authenticateElem.classList.remove('hidden');
	}
}

browser.tabs
	.executeScript({ file: './contentScript.js' })
	.then(onSuccess)
	.catch(reportExecuteScriptError);
