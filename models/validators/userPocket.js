const mongoose = require("mongoose");
const Joi = require("joi");
const { refs } = require("../../config/nett");

// Joi
const userPocketValidator = Joi.object({
	posts: Joi.array().items(Joi.objectId()),
	// TODO: notes
});

// Mongoose
const userPocketSchema = new mongoose.Schema({
	posts: { type: [mongoose.Types.ObjectId], ref: refs.post },
	// TODO: notes
});

module.exports = { userPocketSchema, userPocketValidator };
