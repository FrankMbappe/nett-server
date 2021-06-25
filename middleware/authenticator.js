function authenticate(req, res, next) {
	console.log("Authenticating...");
	// Nothing will be executed unless next() is called
	next();
}

module.exports = authenticate;
