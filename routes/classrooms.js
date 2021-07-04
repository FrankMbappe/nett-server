const express = require("express");
const auth = require("../middleware/auth"); // Protecting the routes
const debug = require("debug")("ns:routes::classrooms");
const router = express.Router();
const { Classroom, validate } = require("../models/Classroom");

//
// GETs
router.get("/", auth, async (req, res) => {
	const classrooms = await Classroom.find({});
	res.send(classrooms);
});
router.get("/:id", auth, async (req, res) => {
	try {
		const classroom = await Classroom.findById(req.params.id);

		debug("A Classroom has been retrieved: " + JSON.stringify(classroom));

		res.send(classroom);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field].message, "\n");
		}
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);
	}
});

//
// POSTs
router.post("/", auth, async (req, res) => {
	// Input validation
	const { error } = validate(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Saving the classroom
	Classroom.create(req.body, (err, classroom) => {
		if (err) return res.status(400).send(err);

		debug(`A Classroom has been added: ${classroom}`);
		res.send(classroom);
	});
});

//
// PUTs
router.put("/:id", auth, async (req, res) => {
	// If invalid, return 400 - Bad request
	const { error } = validate(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Else, try to update
	try {
		const classroom = await Classroom.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.send(classroom);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field], "\n");
		}
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);
	}
});

//
// DELETEs
router.delete("/:id", auth, async (req, res) => {
	try {
		const classroom = await Classroom.findByIdAndDelete(req.params.id);

		res.send(classroom);
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field], "\n");
		}
		return res
			.status(404)
			.send(`No existing classroom with the given ID '${req.params.id}'`);
	}
});

module.exports = router;
