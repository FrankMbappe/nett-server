const debug = require("debug")("ns:middleware");
const jwt = require("jsonwebtoken"); // Auth token
const config = require("config"); // App config

function auth(req, res, next) {
	debug("Authenticating...");

	const token = req.header("x-auth-token");
	if (!token) return res.status(401).send("Access denied. No token provided.");

	try {
		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send("Invalid token.");
	}
}

module.exports = auth;
