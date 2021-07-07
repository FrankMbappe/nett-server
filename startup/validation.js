module.exports = function () {
	const Joi = require("joi");
	// And, in order to use Joi-ObjectId everywhere Joi is used:
	Joi.objectId = require("joi-objectid")(Joi);
};
