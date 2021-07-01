const mongoose = require("mongoose");
const { refs } = require("../../config/nett");

const likeSchema = new mongoose.Schema({
	creationDate: { type: Date, default: Date.now },
	author: { type: mongoose.Types.ObjectId, ref: refs.user },
});

module.exports = likeSchema;
