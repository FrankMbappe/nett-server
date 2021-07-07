const debug = require("debug")("ns:mdlw::errs");

module.exports = function (err, req, res, next) {
	/* This is how all promise rejections of our routes 
       will be handled */
	debug(err);
	res.status(500).send("Something failed.");
	next();
};
