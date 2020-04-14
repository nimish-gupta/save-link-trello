const trelloLink = 'https://api.trello.com/1/';
const tokenKey = 'SAVE_LINK_AUTH_TOKEN';
const keyKey = 'SAVE_LINK_AUTH_KEY';
const boardKey = 'SAVE_LINK_BOARD_NAME';

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

async function getTrelloLink(query = undefined) {
	const { token, key } = await getCredentials();
	const queryWithDelimiter = query === undefined ? '?' : `${query}&`;

	return `${trelloLink}${queryWithDelimiter}key=${key}&token=${token}`;
}

async function fetchBoard(name) {
	const link = await getTrelloLink(`search?query=${name}`);

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

async function checkBoardNamePresent() {
	const [board] = await getFromCookies([boardKey]);
	return board !== undefined;
}
