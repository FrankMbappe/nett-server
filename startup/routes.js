const express = require("express"); // Server
const helmet = require("helmet"); // Security
const logger = require("../middleware/logger"); // Custom middleware
const error = require("../middleware/error"); // Error handling middleware

/* ROUTES */
const auth = require("../routes/auth");
const checks = require("../routes/checks");
const classrooms = require("../routes/classrooms");
const countries = require("../routes/countries");
const users = require("../routes/users");

module.exports = function (app) {
	/* MIDDLEWARE */
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(helmet());
	app.use(logger);
	app.use("/uploads", express.static("uploads")); // Making 'uploads' folder public

	/* Telling that every route starting by '/api/foo' should be handled by the 'foo' router */
	app.use("/api/auth", auth);
	app.use("/api/checks", checks);
	app.use("/api/classrooms", classrooms);
	app.use("/api/countries", countries);
	app.use("/api/users", users);

	/* Handling routes errors */
	app.use(error);
};
