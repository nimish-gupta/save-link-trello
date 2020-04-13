const trelloLink = 'https://api.trello.com/1/';

function getCookie(cookies) {
	return function (name) {
		const [cookie] = cookies.filter((cookie) => cookie.name === name);
		return cookie ? (cookie.value ? cookie.value : undefined) : undefined;
	};
}

async function getCredentials() {
	let key = undefined;
	let token = undefined;

	if (token !== undefined && key !== undefined) {
		return async () => {
			const cookies = await browser.cookies.getAll({
				url: 'http://localhost/api',
			});

			const cookieFetcher = getCookie(cookies);

			token = cookieFetcher('SAVE_LINK_AUTH_TOKEN');
			key = cookieFetcher('SAVE_LINK_AUTH_KEY');
			return { token, key };
		};
	}
	return () => ({ token, key });
}

async function getTrelloLink(query = undefined) {
	const { token, key } = await getCredentials()();
	const queryWithDelimiter = query === undefined ? '?' : `${query}&`;

	return `${trelloLink}${queryWithDelimiter}key=${key}&token=${token}`;
}

async function fetchBoard(name) {
	const link = await getTrelloLink(`search?query=${name}`);

	const result = await fetch(link);
	const response = await response.json();
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
