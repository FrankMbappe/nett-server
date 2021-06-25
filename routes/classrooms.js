const express = require("express"); // Server
const Joi = require("joi"); // Input validation

const router = express.Router(); // Instead of creating a new server
const { classrooms } = require("../data"); // Data

/* Input validation function */
function validateClassroom(classroom) {
	const schema = Joi.object({ value: Joi.string().min(3).required() });
	return schema.validate(classroom);
}

//
// GETs
router.get("/", (_, res) => {
	res.send(classrooms);
});
router.get("/:id", (req, res) => {
	const classroom = classrooms.find(
		(classroom) => classroom.id === req.params.id
	);

	if (!classroom)
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);
	else res.send(classroom);
});

//
// POSTs
router.post("/", (req, res) => {
	const { error } = validateClassroom(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Everything is okay
	const { value } = req.body;

	const classroom = {
		id: classrooms.length + 1,
		value: value,
	};
	classrooms.push(classroom);

	res.send(classroom);
});

//
// PUTs
router.put("/:id", (req, res) => {
	// Look up the classroom
	const classroom = classrooms.find(
		(classroom) => classroom.id === req.params.id
	);
	// If not existing, return 404
	if (!classroom)
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);

	// Otw, validate
	// If invalid, return 400 - Bad request
	const { error } = validateClassroom(req.body);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Update classroom
	// Return updated classroom
	classroom.value = req.body.value;
	res.send(classroom);
});

//
// DELETEs
router.delete("/:id", (req, res) => {
	// Look up the classroom
	const classroom = classrooms.find(
		(classroom) => classroom.id === req.params.id
	);
	// If not existing, return 404
	if (!classroom)
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);

	// Otw, delete
	const index = classrooms.indexOf(classroom);
	classrooms.splice(index, 1);

	// Return classroom
	res.send(classroom);
});

module.exports = router;
