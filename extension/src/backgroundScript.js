/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/

function getMessage({ type, link, error, msg = undefined }) {
	if (type === 'error') {
		return msg || `Link, ${link} could not be saved as ${error}`;
	}
	return msg || `Following ${link} is saved to trello`;
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
