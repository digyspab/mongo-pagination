const mongoose = require('mongoose');

const InitiateMongoServer = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO_NAME, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('Connected to MongoDB database...');
	} catch(e) {
		console.log(e);
		throw e;
	}

	global.mongoDB = InitiateMongoServer;
}

module.exports = InitiateMongoServer;