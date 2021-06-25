const express = require("express"); // Server
const config = require("config"); // Configuration
const helmet = require("helmet"); // Security
const morgan = require("morgan"); // Logging
const startupDebugger = require("debug")("ns:startup"); // Debugging startup
const dbDebugger = require("debug")("ns:db"); // Debugging startup
const Joi = require("joi"); // Input validation

const users = require("./datatest");
const logger = require("./logger");

const app = express();
const port = process.env.PORT || 3000;

/* Middleware */
app.use(express.json());
app.use(helmet());
app.use(logger()); // Custom one

/* If we are in development mode, morgan is enabled */
if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	startupDebugger("Morgan enabled...");
	/* Showing server configuration depending on the environment */
	startupDebugger(`Application name: ${config.get("name")}`);
	// Custom environment variable
	startupDebugger(`Test variable: ${config.get("testvar")}`);
}

/* User input validation function */
function validateUser(user) {
	const schema = Joi.object({ value: Joi.string().min(3).required() });
	return schema.validate(user);
}

//
// GET
app.get("/", (_, res) => {
	res.send("Hello world");
});
app.get("/api/users", (_, res) => {
	res.send(users);
});
app.get("/api/users/:id", (req, res) => {
	const user = users.find((user) => user.id === parseInt(req.params.id));

	if (!user)
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);
	else res.send(user);
});

//
// POST
app.post("/api/users", (req, res) => {
	const { error } = validateUser(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Everything is okay
	const { value } = req.body;

	const user = {
		id: users.length + 1,
		value: value,
	};
	users.push(user);

	res.send(user);
});

//
// PUT
app.put("/api/users/:id", (req, res) => {
	// Look up the user
	const user = users.find((user) => user.id === parseInt(req.params.id));
	// If not existing, return 404
	if (!user)
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);

	// Otw, validate
	// If invalid, return 400 - Bad request
	const { error } = validateUser(req.body);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Update user
	// Return updated user
	user.value = req.body.value;
	res.send(user);
});

//
// DELETE
app.delete("/api/users/:id", (req, res) => {
	// Look up the user
	const user = users.find((user) => user.id === parseInt(req.params.id));
	// If not existing, return 404
	if (!user)
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);

	// Otw, delete
	const index = users.indexOf(user);
	users.splice(index, 1);

	// Return user
	res.send(user);
});

app.listen(port, () => console.log(`Listening port ${port}...`));
