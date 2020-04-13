(function () {
	function notifyExtension(e) {
		if (e.altKey) {
			console.log('hi');
		}
	}

	window.addEventListener('click', notifyExtension);
})();
browser.runtime.onMessage.addListener((message) => console.log(message));
