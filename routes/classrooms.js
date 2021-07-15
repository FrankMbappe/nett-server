const express = require("express");
const auth = require("../middleware/auth"); // Protecting the routes
const teacher = require("../middleware/teacher");
const router = express.Router();
const { Classroom, validate } = require("../models/Classroom");
const { User } = require("../models/User");

// Gets
router.get("/", auth, async (req, res) => {
	const classrooms = await Classroom.find({}).populate(
		"teacher posts.author posts.comments.author" +
			" quizzes.author quizzes.comments.author" +
			" tutorials.author tutorials.comments.author"
	);
	res.send(classrooms);
});
router.get("/:id", auth, async (req, res) => {
	const classroom = await Classroom.findById(req.params.id).populate(
		"teacher posts.author posts.comments.author" +
			" quizzes.author quizzes.comments.author" +
			" tutorials.author tutorials.comments.author"
	);
	res.send(classroom);
});

// Posts
router.post("/", [auth, teacher], async (req, res) => {
	const classroomToCreate = { ...req.body, teacher: req.user._id };

	// Input validation
	const { error } = validate(classroomToCreate);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	/* Starting a transaction to save the classroom and add 
	   its '_id' to the user's 'classrooms' property */

	const session = await Classroom.startSession();

	await session.withTransaction(async () => {
		try {
			const classroom = new Classroom(classroomToCreate);

			await classroom.save();

			const newUser = await User.findByIdAndUpdate(
				req.user._id,
				{
					$push: { classrooms: classroom._id },
				},
				{ new: true }
			);

			return Promise.resolve(
				res.send({ classroom: classroom, userClassrooms: newUser.classrooms })
			);
		} catch (ex) {
			return Promise.reject(
				res
					.status(500)
					.send("Something went wrong while executing your request.")
			);
		}
	});

	session.endSession();
});

// Puts
router.put("/:id", auth, async (req, res) => {
	//! Might be a problem here with the 'teacher' property not set
	// If invalid, return 400 - Bad request
	const { error } = validate(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Else, try to update
	const classroom = await Classroom.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		{ new: true }
	);

	res.send(classroom);
});
router.put("/quit/:id", auth, async (req, res) => {
	/* Starting a transaction to update the user's 'classrooms' prop 
	   and the classroom's 'participants' prop */

	const session = await Classroom.startSession();

	await session.withTransaction(async () => {
		try {
			const classroom = await Classroom.findById(req.params.id);

			if (!classroom)
				return Promise.reject(
					res.status(404).send("No classroom with the given ID.")
				);

			// Removing user from classroom's participants
			const newClassroom = await Classroom.findByIdAndUpdate(
				classroom._id,
				{
					$pull: { participants: req.user._id },
				},
				{ new: true }
			);

			// Removing classroom from user's classroom list
			const newUser = await User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: { classrooms: classroom._id },
				},
				{ new: true }
			);

			return Promise.resolve(
				res.send({
					classroomParticipants: newClassroom.participants,
					userClassrooms: newUser.classrooms,
				})
			);
		} catch (ex) {
			return Promise.reject(
				res
					.status(500)
					.send("Something went wrong while executing your request.")
			);
		}
	});

	session.endSession();
});

// Deletes
router.delete("/:id", [auth, teacher], async (req, res) => {
	/* Starting a transaction to update the user's 'classrooms' prop 
	and the classroom's 'participants' prop */

	const session = await Classroom.startSession();

	await session.withTransaction(async () => {
		try {
			const classroom = await Classroom.findById(req.params.id);

			if (!classroom)
				return Promise.reject(
					res.status(404).send("No classroom with the given ID.")
				);

			// Removing classroom ID from every participant's classroom list
			let usersUpdated = 0;
			classroom.participations.forEach(async (participantId) => {
				await User.findByIdAndUpdate(participantId, {
					$pull: { classrooms: classroom._id },
				});
				usersUpdated++;
			});

			// Deleting classroom
			await Classroom.findByIdAndDelete(classroom._id);

			return Promise.resolve(
				res.send({ deleted: classroom, usersUpdated: usersUpdated })
			);
		} catch (ex) {
			return Promise.reject(
				res
					.status(500)
					.send("Something went wrong while executing your request.")
			);
		}
	});

	session.endSession();
});

// Additional route handlers
// POSTS
router.use("/:id/posts", require("./posts"));

// QUIZZES
router.use("/:id/quizzes", require("./quizzes"));

// TUTORIALS
router.use("/:id/tutorials", require("./tutorials"));

// COMMENTS
router.use("/:id/posts/:postId/comments", require("./comments"));

module.exports = router;
