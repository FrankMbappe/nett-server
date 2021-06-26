const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/").then(() => {
	console.log("Connected to MongoDB...");
});
