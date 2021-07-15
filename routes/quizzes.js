const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const { Quiz, validate } = require("../models/Quiz");
const { Classroom } = require("../models/Classroom");

// Create
router.post("/", auth, async (req, res) => {
	// Validating the input
	const quizToAdd = {
		author: req.user._id,
		...req.body,
	};
	const { error } = validate(quizToAdd);
	if (error) {
		console.log(error);
		return res.status(400).send(error.details.map(({ message }) => message));
	}

	// Pushing quiz to classroom post list
	const quiz = new Quiz(quizToAdd);
	console.log(quiz);
	await Classroom.findOneAndUpdate(
		{ _id: req.params.id },
		{ $push: { quizzes: quiz } }
	);

	// Return OK
	res.send(quiz);
});

module.exports = router;
