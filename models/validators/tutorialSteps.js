const mongoose = require("mongoose");
const fileSchema = require("./file");

const tutorialStep = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	position: { type: Number, min: 1, required: true },
	title: { type: String, minlength: 3, maxlength: 255, required: true },
	description: { type: String, maxlength: 255 },
	file: { type: fileSchema, required: true },
});

module.exports = tutorialStep;
