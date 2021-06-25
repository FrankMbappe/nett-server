const debug = require("debug")("ns:mdlw"); // Debugging startup

function authenticate(req, res, next) {
	debug("Authenticating...");
	// Nothing will be executed unless next() is called
	next();
}

module.exports = authenticate;
