const express = require("express"); // Server
const config = require("config"); // Configuration
const helmet = require("helmet"); // Security
const morgan = require("morgan"); // Logging
const startupDebugger = require("debug")("ns:startup"); // Debugging startup
const dbDebugger = require("debug")("ns:db"); // Debugging startup
const Joi = require("joi"); // Input validation

const courses = require("./datatest");
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

function validateCourse(course) {
	const schema = Joi.object({ value: Joi.string().min(3).required() });
	return schema.validate(course);
}

//
// GET
app.get("/", (_, res) => {
	res.send("Hello world");
});
app.get("/api/courses", (_, res) => {
	res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
	const course = courses.find(
		(course) => course.id === parseInt(req.params.id)
	);

	if (!course)
		return res
			.status(404)
			.send(`No existing course with the given ID '${req.params.id}'`);
	else res.send(course);
});

//
// POST
app.post("/api/courses", (req, res) => {
	const { error } = validateCourse(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Everything is okay
	const { value } = req.body;

	const course = {
		id: courses.length + 1,
		value: value,
	};
	courses.push(course);

	res.send(course);
});

//
// PUT
app.put("/api/courses/:id", (req, res) => {
	// Look up the course
	const course = courses.find(
		(course) => course.id === parseInt(req.params.id)
	);
	// If not existing, return 404
	if (!course)
		return res
			.status(404)
			.send(`No existing course with the given ID '${req.params.id}'`);

	// Otw, validate
	// If invalid, return 400 - Bad request
	const { error } = validateCourse(req.body);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Update course
	// Return updated course
	course.value = req.body.value;
	res.send(course);
});

//
// DELETE
app.delete("/api/courses/:id", (req, res) => {
	// Look up the course
	const course = courses.find(
		(course) => course.id === parseInt(req.params.id)
	);
	// If not existing, return 404
	if (!course)
		return res
			.status(404)
			.send(`No existing course with the given ID '${req.params.id}'`);

	// Otw, delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	// Return course
	res.send(course);
});

app.listen(port, () => console.log(`Listening port ${port}...`));
