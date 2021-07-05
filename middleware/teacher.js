const { userTypes } = require("../config/nett");

function teacher(req, res, next) {
	if (req.user._type !== userTypes.teacher)
		return res.status(403).send("Access denied.");
	next();
}

module.exports = teacher;
