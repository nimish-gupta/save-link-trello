/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/

function getMessage({ type, msg }) {
	if (type === 'error') {
		return `ERROR!, ${msg}`;
	}
	return msg;
}
async function createNotification({ link, type, msg }) {
	const message = getMessage({ type, msg });
	browser.notifications.create({
		type: 'basic',
		title: 'Save Link Trello',
		message: message,
		iconUrl: browser.extension.getURL('icons/presentation.svg'),
	});
}

browser.runtime.onMessage.addListener(createNotification);
