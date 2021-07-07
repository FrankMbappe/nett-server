const winston = require("winston");

module.exports = function (err, req, res, next) {
	/* This is how all promise rejections of our routes 
       will be handled */

	// Saving logs in the App log file
	winston.error(err.message, err);

	res
		.status(500)
		.send("An internal error occured while executing the request.");
};
