const getAuthRequestToken = require('./_config/oauth').getAuthRequestToken;

module.exports = (req, res) => {
	getAuthRequestToken(res);
};
