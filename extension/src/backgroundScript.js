/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/

function getMessage({ type, link, error }) {
	if (type === 'error') {
		return `Link, ${link} could not be saved to ${error}`;
	}
	return `Following ${link} is saved to trello`;
}
async function createNotification({ link, type, error }) {
	const message = getMessage({ type, link, error });
	browser.notifications.create({
		type: 'basic',
		title: 'Save Link Trello',
		message: message,
		iconUrl: browser.extension.getURL('icons/presentation.svg'),
	});
}

browser.runtime.onMessage.addListener(createNotification);
