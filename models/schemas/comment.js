const mongoose = require("mongoose");
const { refs } = require("../../config/nett");
const likeSchema = require("./like");

const commentSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
	text: { type: String, minlength: 5, maxlength: 3000, required: true },
	likes: { type: [likeSchema], default: [] },
});

module.exports = commentSchema;
