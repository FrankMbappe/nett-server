const debug = require("debug")("ns:mdlw"); // Debugging startup

function log(req, res, next) {
	debug("Logging...");
	// Nothing will be executed unless next() is called
	next();
}

module.exports = log;
