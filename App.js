const express = require("express"); // Server
const config = require("config"); // Configuration
const helmet = require("helmet"); // Security
const morgan = require("morgan"); // Logging
const debug = require("debug")("ns:startup"); // Debugging startup
const logger = require("./middleware/logger"); // Custom middleware
const connectToMongoDb = require("./database/mongo"); // Database

/* INPUT VALIDATION */
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); // To use this prop everywhere Joi is used

/* ROUTES */
const root = require("./routes/root");
const users = require("./routes/users");
const check = require("./routes/check");
const classrooms = require("./routes/classrooms");

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
app.use("/api/classrooms", classrooms);
app.use("/api/users", users);
app.use("/api/check", check);
app.use("/", root);

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

app.listen(port, () => debug(`Listening port ${port}...`));
