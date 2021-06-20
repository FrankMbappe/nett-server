const express = require("express");
const Joi = require("joi");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
	console.log("Logging...");
	// Nothing will be executed unless next() is called
	next();
});

app.use((req, res, next) => {
	console.log("Authenticating...");
	// Nothing will be executed unless next() is called
	next();
});

const courses = [
	{ id: 1, value: "Data Mining" },
	{ id: 2, value: "Functional French" },
	{ id: 3, value: "Software Process & Quality" },
	{ id: 4, value: "Compiler Design" },
];

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
