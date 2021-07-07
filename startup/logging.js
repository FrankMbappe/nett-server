const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

/* LOGGER CONFIGURATION  */
module.exports = function () {
	// Colorizing winston
	const winstonFormat = winston.format.combine(
		winston.format.colorize({
			all: true,
		}),
		winston.format.label({
			label: "[LOGGER]",
		}),
		winston.format.timestamp({
			format: "YY-MM-DD HH:MM:SS",
		}),
		winston.format.printf(
			(info) =>
				` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
		)
	);

	// Errors outside express.js scope
	winston.exceptions.handle(
		new winston.transports.File({
			filename: "logs/nsexcepts.log",
			handleExceptions: true,
		}),
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winstonFormat),
		})
	);

	// Errors within express.js scope
	winston.add(new winston.transports.File({ filename: "logs/nslog.log" })); // Save logs to file
	winston.add(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winstonFormat),
		})
	); // Show logs to console
	winston.add(
		new winston.transports.MongoDB({
			db: "mongodb://localhost/nettdb",
			options: { useUnifiedTopology: true },
		})
	); // Save logs to MongoDB
};
