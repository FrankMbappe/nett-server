const mongoose = require("mongoose");
const Joi = require("joi");
const { userHonorifics, userGenders, refs } = require("../../config/nett");
const { userPocketValidator } = require("./userPocket");

// Joi
const userProfileValidator = Joi.object({
	honorific: Joi.string().valid(...Object.values(userHonorifics)),
	firstName: Joi.string().min(1).max(255).required(),
	lastName: Joi.string().min(1).max(255).required(),
	birthDate: Joi.date().less("now"),
	email: Joi.string().email(),
	gender: Joi.string().valid(...Object.values(userGenders)),
	picUri: Joi.string(),
	picCloudPublicId: Joi.string(),
	pocket: userPocketValidator,
});

// Mongoose
const userProfileSchema = new mongoose.Schema({
	honorific: {
		type: String,
		enum: Object.values(userHonorifics),
	},
	firstName: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
		trim: true,
	},
	birthDate: Date,
	email: { type: String },
	gender: {
		type: String,
		enum: Object.values(userGenders),
		lowercase: true,
	},
	picUri: String,
	picCloudPublicId: String,
	pocket: {
		posts: [{ type: mongoose.Types.ObjectId, ref: refs.post }],
		// TODO: notes,
	},
});

module.exports = { userProfileValidator, userProfileSchema };
