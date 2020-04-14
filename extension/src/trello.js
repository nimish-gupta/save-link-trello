const trelloLink = 'https://api.trello.com/1/';
const tokenKey = 'SAVE_LINK_AUTH_TOKEN';
const keyKey = 'SAVE_LINK_AUTH_KEY';
const boardKey = 'SAVE_LINK_BOARD_ID';

async function getCredentials() {
	const storage = await getFromStorage([tokenKey, keyKey]);
	let token = storage[tokenKey];
	let key = storage[keyKey];

	if (token !== undefined && key !== undefined) {
		return { token, key };
	}

	[token, key] = getFromCookies([tokenKey, keyKey]);

	await saveInLocalStorage({ [tokenKey]: token, [keyKey]: key });

	return { token, key };
}

async function getTrelloLink(query) {
	const { token, key } = await getCredentials();

	return `${trelloLink}${query}key=${key}&token=${token}`;
}

async function fetchBoard(name) {
	const link = await getTrelloLink(`search?query=${name}&`);

	const result = await fetch(link);
	const response = await result.json();

	if (response.boards) {
		const board = response.boards.find(
			(board) => board.name.toLowerCase() === name.toLowerCase()
		);
		if (board !== undefined) {
			return board;
		}
	}

	throw new Error('Board not found');
}

async function fetchList(boardId) {
	const link = await getTrelloLink(`boards/${boardId}/lists?`);

	const result = await fetch(link);
	const response = await result.json();

	if (response.lists) {
		const list = response.lists.find(
			(list) => list.name.toLowerCase() === 'things to do'
		);
		if (list !== undefined) {
			return list;
		}
	}

	throw new Error('List not found');
}

async function checkBoardPresent() {
	const [board] = await getFromCookies([boardKey]);
	return board !== undefined;
}
