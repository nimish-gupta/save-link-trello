const getAuthRequestToken = require('./_config/oauth').getAuthRequestToken;

module.exports = (request, response) => {
	getAuthRequestToken({ response });
};
