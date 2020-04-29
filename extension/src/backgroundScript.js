/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/
async function createNotification(link) {
	const message = `Following ${link} is saved to trello`;
	browser.notifications.create({
		type: 'basic',
		title: 'Save Link Trello',
		message: message,
		iconUrl: browser.extension.getURL('icons/presentation.svg'),
	});
}

browser.runtime.onMessage.addListener(createNotification);
