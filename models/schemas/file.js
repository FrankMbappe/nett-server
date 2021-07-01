const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
	_type: { type: String, enum: ["image", "video", "other"], required: true },
	uri: { type: String, required: true },
	name: { type: String, minlength: 3, maxlength: 255, required: true },
	size: { type: Number, required: true },
	extension: { type: String, required: true },
});

module.exports = fileSchema;
