const express = require("express"); // Server
const config = require("config"); // Configuration
const helmet = require("helmet"); // Security
const morgan = require("morgan"); // Logging
const debug = require("debug")("ns:startup"); // Debugging startup
const logger = require("./middleware/logger"); // Custom middleware
const connectToMongoDb = require("./database/mongo"); // Database

/* ENVIRONMENT VARIABLES */
if (
	!config.get("jwtPrivateKey") ||
	!config.get("twilioAccountSid") ||
	!config.get("twilioAuthToken")
) {
	console.error(
		"FATAL ERROR: Some of the required the environment variables are not set."
	);
	process.exit(1);
}

/* INPUT VALIDATION */
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); // To use this prop everywhere Joi is used

/* ROUTES */
const auth = require("./routes/auth");
const checks = require("./routes/checks");
const classrooms = require("./routes/classrooms");
const countries = require("./routes/countries");
const users = require("./routes/users");

/* SERVER CREATION */
const app = express();
const port = process.env.PORT || 3000;

/* CONNECTION TO DATABASE */
connectToMongoDb();

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(logger);

/* Telling that every route starting by '/api/foo' should be handled by the 'foo' router */
app.use("/api/auth", auth);
app.use("/api/checks", checks);
app.use("/api/classrooms", classrooms);
app.use("/api/countries", countries);
app.use("/api/users", users);

/* If we are in development mode, Morgan is enabled */
if (app.get("env") === "development") {
	app.use(morgan("tiny", { stream: { write: (msg) => debug(msg) } }));
	debug("Morgan enabled...");

	/* Showing server configuration depending on the environment */
	debug(`Application name: ${config.get("name")}`);

	// Custom environment variable
	if (!process.env.DEBUG)
		console.log(
			"'DEBUG' environment variable is not yet set. Debugger logs cannot be displayed."
		);
}

app.listen(port, "192.168.8.100", () => debug(`Listening port ${port}...`));
