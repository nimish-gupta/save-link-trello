const url = require('url');
const getTokenSecret = require('./_config/db').getTokenSecret;
const getOAuthAccessToken = require('./_config/oauth').getOAuthAccessToken;

module.exports = async (req, res) => {
	const query = url.parse(req.url, true).query;
	const token = query.oauth_token;
	const tokenSecret = await getTokenSecret(token);
	const verifier = query.oauth_verifier;
	getOAuthAccessToken({ token, tokenSecret, verifier, res });
};
