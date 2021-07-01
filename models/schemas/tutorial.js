const mongoose = require("mongoose");
const postSchema = require("./post");
const tutorialStep = require("./tutorialSteps");

const tutorialSchema = new mongoose.Schema({
	...postSchema.obj,
	title: { type: String, minlength: 3, maxlength: 255, required: true },
	description: { type: String, maxlength: 255 },
	steps: { type: [tutorialStep], required: true },
});

module.exports = tutorialSchema;
