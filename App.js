const express = require("express"); // Server
const config = require("config"); // Configuration
const helmet = require("helmet"); // Security
const morgan = require("morgan"); // Logging
const startupDebugger = require("debug")("ns:startup"); // Debugging startup

const logger = require("./logger");

/* ROUTES */
const root = require("./routes/root");
const users = require("./routes/users");

const app = express();
const port = process.env.PORT || 3000;

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(logger()); // Custom one

/* Telling that every route starting by '/api/foo' should be handled by the foo router */
app.use("/api/users", users);
app.use("/", root);

/* If we are in development mode, Morgan is enabled */
if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	startupDebugger("Morgan enabled...");
	/* Showing server configuration depending on the environment */
	startupDebugger(`Application name: ${config.get("name")}`);
	// Custom environment variable
	startupDebugger(`Test variable: ${config.get("testvar")}`);
}

app.listen(port, () => console.log(`Listening port ${port}...`));
