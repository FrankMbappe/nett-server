const mongoose = require("mongoose"); // Database
const debug = require("debug")("ns:mongo"); // Debugger

async function connectToMongoDb() {
	try {
		await mongoose.connect("mongodb://localhost/playground", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		debug("Successfully connected to the database...");
	} catch (error) {
		debug(error);
	}
}

module.exports = connectToMongoDb;
