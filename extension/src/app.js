async function checkLogin() {
	const { token, key } = await getCredentials();

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

	if (isLogin) {
		authenticateElem.classList.add('hidden');
		const isNamePresent = await checkBoardNamePresent();
		if (!isNamePresent) {
			trelloContent.classList.remove('hidden');
		}
	} else {
		await clearLocalStorage();
		authenticateElem.classList.remove('hidden');
		trelloContent.classList.add('hidden');
	}

	authenticateElem.addEventListener('click', authenticateUser);
}

async function getBoardName() {
	const name = document.querySelector('#trello-board-input').value;
	const board = await fetchBoard(name);
	await saveInLocalStorage({ boardKey: board.name });
}

function authenticateUser() {
	window.open('http://localhost:3000/api/login');
}

browser.tabs
	.executeScript({ file: './contentScript.js' })
	.then(onSuccess)
	.catch(reportExecuteScriptError);
