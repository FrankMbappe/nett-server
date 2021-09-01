const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    code: String,
    dialCode: { type: String, required: true },
    name: { type: String, required: true },
    flag: String,
});

const Country = mongoose.model("country", schema);

module.exports = Country;
