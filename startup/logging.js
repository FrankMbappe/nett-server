const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
	/* LOGGER CONFIGURATION  */

	// Errors outside express.js scope
	winston.exceptions.handle(
		new winston.transports.File({
			filename: "nsexcepts.log",
			handleExceptions: true,
		})
	);
	//// process.on("unhandledRejection", (ex) => {
	//// 	winston.error(ex.message, ex);
	//// 	process.exit(1);
	//// });

	// Errors within express.js scope
	winston.add(new winston.transports.File({ filename: "nslog.log" })); // Save logs to file
	winston.add(
		new winston.transports.MongoDB({
			db: "mongodb://localhost/nettdb",
			options: { useUnifiedTopology: true },
		})
	); // Save logs to MongoDB
};
