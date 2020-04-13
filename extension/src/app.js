async function checkLogin() {
	const { token, key } = await getCredentials()();

	return token !== undefined && key !== undefined;
}

function reportExecuteScriptError(error) {
	document.querySelector('#popup-content').classList.add('hidden');
	document.querySelector('#error-content').classList.remove('hidden');
	document.querySelector('#error-content').innerHTML = error;
}

async function onSuccess() {
	const isLogin = await checkLogin();

	const authenticateElem = document.querySelector('#authenticate');
	const trelloContent = document.querySelector('#trello-content');

	if (isLogin === true) {
		authenticateElem.classList.add('hidden');
		trelloContent.classList.remove('hidden');
	} else {
		authenticateElem.classList.remove('hidden');
		trelloContent.classList.add('hidden');
	}

	authenticateElem.addEventListener('click', authenticateUser);
}

async function checkBoardName() {
	fetch('');
}

function authenticateUser() {
	window.open('http://localhost:3000/api/login');
}

browser.tabs
	.executeScript({ file: './contentScript.js' })
	.then(onSuccess)
	.catch(reportExecuteScriptError);
