(function () {
	function notifyExtension(e) {
		if (e.altKey) {
			console.log('hi');
		}
	}

	window.addEventListener('click', notifyExtension);
})();
