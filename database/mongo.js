const mongoose = require("mongoose"); // Database
const debug = require("debug")("ns:mongo"); // Debugger

async function connectToMongoDb() {
	try {
		await mongoose.connect("mongodb://localhost/nettdb", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		debug("Successfully connected to the database...");
	} catch (error) {
		debug(error);
	}
}

module.exports = connectToMongoDb;
