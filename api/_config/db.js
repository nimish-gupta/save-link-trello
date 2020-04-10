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
	});

	// Select the database through the connection,
	// using the database path of the connection string
	const db = await client.db(constants.MONGO_DB_NAME);

	// Cache the database connection and return the connection
	cachedCollection = await db.collection(collectionName);
	return db;
}

const getTokenSecret = async (token) => {
	const collection = await getCollection();
	const [tokenSecret] = await collection.find({ token }).toArray();
	if (tokenSecret === undefined || tokenSecret === null) {
		throw new Error('token not found', token);
	}
	return tokenSecret.secret;
};

const storeTokenSecret = async (token, secret) => {
	const collection = await getCollection();
	const [row] = await collection
		.update({ token }, { token, secret }, { upsert: true, multi: false })
		.toArray();
	if (row === undefined || row === null) {
		throw new Error('could not create row', token, secret);
	}
	return row;
};

module.exports = {
	getTokenSecret,
	storeTokenSecret,
};
