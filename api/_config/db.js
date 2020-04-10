const MongoClient = require('mongodb').MongoClient;
const constants = require('./constants');

const collectionName = 'trello-token';

let cachedCollection = null;

async function getCollection() {
	if (cachedCollection) {
		return cachedCollection;
	}

	const client = await MongoClient.connect(constants.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	// Select the database through the connection,
	// using the database path of the connection string
	const db = await client.db(constants.MONGO_DB_NAME);

	// Cache the database connection and return the connection
	cachedCollection = await db.collection(collectionName);
	return cachedCollection;
}

const getTokenSecret = async (token) => {
	const collection = await getCollection();
	const [tokenSecret] = await collection.find({ token }).toArray();
	if (tokenSecret === undefined || tokenSecret === null) {
		throw new Error('token not found', token);
	}
	return tokenSecret.secret;
};

const storeTokenSecret = async ({ token, secret }) => {
	const collection = await getCollection();
	await collection.updateOne(
		{ token },
		{ $set: { token, secret } },
		{ upsert: true, multi: false }
	);
};

module.exports = {
	getTokenSecret,
	storeTokenSecret,
};
