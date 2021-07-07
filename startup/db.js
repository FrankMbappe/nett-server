const mongoose = require("mongoose"); // Database
const winston = require("winston");

module.exports = async () => {
	await mongoose.connect("mongodb://localhost/nettdb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
	winston.info(
		"Successfully connected to the database...",
		new Date().getTime()
	);
};
