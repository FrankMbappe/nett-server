function log(req, res, next) {
	console.log("Logging...");
	// Nothing will be executed unless next() is called
	next();
}

module.exports = log;
