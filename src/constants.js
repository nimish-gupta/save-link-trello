module.exports = {
	TRELLO_KEY: process.env.TRELLO_KEY,
	TRELLO_SECRET: process.env.TRELLO_SECRET,
	PROJECT_URL: process.env.PROJECT_URL || 'http://localhost:3000',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://root:password@mongo:27017',
	MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'trello-auth',
};
