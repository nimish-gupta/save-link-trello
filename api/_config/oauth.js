const OAuth = require('oauth').OAuth;

const constants = require('./constants');
const storeTokenSecret = require('./db').storeTokenSecret;

const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
const loginCallback = `${constants.PROJECT_URL}/callback`;
const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';

const appName = 'Save Link Trello Auth';
const scope = 'read,write';
const expiration = 'never';

const getOauth = () =>
	new OAuth(
		requestURL,
		accessURL,
		constants.TRELLO_KEY,
		constants.TRELLO_SECRET,
		'1.0A',
		loginCallback,
		'HMAC-SHA1'
	);

const getAuthRequestToken = ({ response }) => {
	const oauth = getOauth();
	oauth.getOAuthRequestToken(async function (error, token, secret) {
		await storeTokenSecret({ token, secret });

		response.redirect(
			`${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}&return_url=${loginCallback}`
		);
	});
};

const getOAuthAccessToken = ({ token, tokenSecret, verifier, res }) => {
	const oauth = getOauth();
	return oauth.getOAuthAccessToken(token, tokenSecret, verifier, function (
		error,
		accessToken
	) {
		res.render('success', {
			token: accessToken,
			key: constants.TRELLO_KEY,
		});
	});
};
module.exports = { getAuthRequestToken, getOAuthAccessToken };
