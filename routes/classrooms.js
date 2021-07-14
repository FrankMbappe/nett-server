const express = require("express");
const auth = require("../middleware/auth"); // Protecting the routes
const teacher = require("../middleware/teacher");
const router = express.Router();
const { Classroom, validate } = require("../models/Classroom");
const { Post, validate: validatePost } = require("../models/Post");
const { Quiz, validate: validateQuiz } = require("../models/Quiz");
const { Tutorial, validate: validateTutorial } = require("../models/Tutorial");
const { Comment, validate: validateComment } = require("../models/Comment");
const { User } = require("../models/User");

//£ Saving file in the server

// const { uploadFile } = require("../libs/s3");
const { MAX_FILE_SIZE } = require("../config/nett");
const path = require("path");
const multer = require("multer");
const fileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		const base = "uploads";
		if (String(file.mimetype).includes("image"))
			return cb(null, base + "/images/");
		if (String(file.mimetype).includes("video"))
			return cb(null, base + "/videos/");
		cb(null, base + "/documents/");
	},
	filename: function (req, file, cb) {
		const fileName =
			req.user._id +
			"_" +
			new Date().getTime() +
			path.extname(file.originalname);
		cb(null, fileName);
	},
});
const upload = multer({
	storage: fileStorage,
	limits: { fileSize: MAX_FILE_SIZE },
});
const formatFile = (file) => {
	if (!file) return null;
	return {
		mimetype: file.mimetype,
		uri: file.path,
		name: file.originalname,
		size: file.size,
		extension: path.extname(file.originalname),
	};
};

//£ CLASSROOMS

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

//£ POSTS

const postEndpoint = "/:id/posts";

// Get
router.get(postEndpoint, async (req, res) => {
	// Get post list from classroom
	const { posts, quizzes, tutorials } = await Classroom.findById(
		req.params.id,
		{
			posts: 1,
			quizzes: 1,
			tutorials: 1,
		}
	).populate(
		"posts.author posts.comments.author" +
			" quizzes.author quizzes.comments.author" +
			" tutorials.author tutorials.comments.author"
	);
	if (!(posts || quizzes || tutorials))
		return res
			.status(400)
			.send(`No classroom found with the ID '${req.params.id}'.`);
	console.log(quizzes);
	// Return OK
	res.send([...posts, ...quizzes, ...tutorials]);
});
router.get(`${postEndpoint}/:postId`, async (req, res) => {
	// Get particular post from post list of a classroom
	const { posts, quizzes, tutorials } = await Classroom.findById(
		req.params.id,
		{ posts: 1, quizzes: 1, tutorials: 1 }
	);
	const allPosts = [...posts, ...quizzes, ...tutorials];
	const post = allPosts.find(
		(post) => String(post._id) === String(req.params.postId)
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!post)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(post);
});

// Create
router.post(postEndpoint, [auth, upload.single("_file")], async (req, res) => {
	// Getting classroom by ID
	const classroom = await Classroom.findById(req.params.id);
	if (!classroom)
		return res
			.status(400)
			.send(`No classroom found with the given ID '${req.params.id}'.`);

	// Checking if the post includes a file
	let file = null;
	if (req.file) {
		// Upload file to S3 bucket
		// const uploadResult = await uploadFile(req.file);

		// TODO: It returns something like below, set file.uri to the 'Location' property
		// {
		// 	ETag: '"e822c8031345dd06420cfcac4acde9fe"',
		// 	Location: 'https://nett-server-b0.s3.us-east-2.amazonaws.com/60e10bea426b882fd4e97531_1626301063882.jpg',
		// 	key: '60e10bea426b882fd4e97531_1626301063882.jpg',
		// 	Key: '60e10bea426b882fd4e97531_1626301063882.jpg',
		// 	Bucket: 'nett-server-b0'
		// }

		// Format file to save
		file = formatFile(req.file);
	}

	// Then validating post input
	const postToCreate = {
		author: req.user._id,
		...(file && { file }),
		...req.body,
	};
	const { error } = validatePost(postToCreate);
	if (error) {
		console.log(error);
		return res.status(400).send(error.details.map(({ message }) => message));
	}

	// Pushing post to classroom post list
	const post = new Post(postToCreate);
	classroom.posts.push(post);
	classroom.save();

	// Return OK
	res.send(post);
});

// Update
router.put(`${postEndpoint}/:postId`, auth, async (req, res) => {
	// Input validation
	const update = { author: req.user._id, ...req.body };
	const { error } = validatePost(update);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	const result = await Classroom.updateOne(
		{ _id: req.params.id, "posts._id": req.params.postId },
		{ $set: { "posts.$": update } }
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!result)
		return res.status(400).send(`No post found with the path '${path}'.`);

	res.send(result);
});

// Delete
router.delete(`${postEndpoint}/:postId`, auth, async (req, res) => {
	// Deleting post
	const result = await Classroom.updateOne(
		{
			_id: req.params.id,
			"posts._id": req.params.postId,
		},
		{
			$pull: { posts: { _id: req.params.postId } },
		}
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!result)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(result);
});

//£ QUIZZES

const quizEndpoint = "/:id/quizzes";

// Create
router.post(quizEndpoint, auth, async (req, res) => {
	// Validating the input
	const quizToAdd = {
		author: req.user._id,
		...req.body,
	};

	const { error } = validateQuiz(quizToAdd);
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

//£ TUTORIALS

const tutorialEndpoint = "/:id/tutorials";

// Create
router.post(
	tutorialEndpoint,
	[auth, upload.array("steps[video]")],
	async (req, res) => {
		// Getting classroom by ID
		const classroom = await Classroom.findById(req.params.id);
		if (!classroom)
			return res
				.status(400)
				.send(`No classroom found with the given ID '${req.params.id}'.`);

		// Then validating the input
		const tutorialToCreate = {
			author: req.user._id,
			...req.body,
		};
		const { error } = validateTutorial(tutorialToCreate);
		if (error) {
			console.log(error);
			return res.status(400).send(error.details.map(({ message }) => message));
		}

		// Pushing quiz to classroom post list
		const tutorial = new Tutorial(tutorialToCreate);
		console.log(tutorial);
		await Classroom.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { tutorials: tutorial } }
		);

		// Return OK
		res.send(tutorial);
	}
);

//£ COMMENT

const commentEndpoint = `${postEndpoint}/:postId/comments`;

// Get
router.get(commentEndpoint, auth, async (req, res) => {
	// Get comment list from the post of a classroom
	const { posts } = await Classroom.findById(req.params.id, { posts: 1 });
	const { comments } = posts.find(
		(post) => String(post._id) === String(req.params.postId)
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!comments)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(comments);
});
router.get(`${commentEndpoint}/:commentId`, auth, async (req, res) => {
	// Get comment list from the post of a classroom
	const { posts } = await Classroom.findById(req.params.id, { posts: 1 });
	const comment = posts
		.flatMap((x) => x.comments)
		.find((comment) => String(comment._id) === String(req.params.commentId));
	const path = `classroom:${req.params.id}/post:${req.params.postId}/comment:${req.params.commentId}`;
	if (!comment)
		return res.status(400).send(`No comment found with the path '${path}'.`);

	// Return OK
	res.send(comment);
});

// Add
router.post(commentEndpoint, auth, async (req, res) => {
	// Input validation
	const commentToAdd = { author: req.user._id, ...req.body };
	const { error } = validateComment(commentToAdd);
	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Adding comment
	const comment = new Comment(commentToAdd);
	const result = await Classroom.updateOne(
		{ _id: req.params.id, "posts._id": req.params.postId },
		{ $push: { "posts.$.comments": comment } }
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}`;
	if (!result)
		return res.status(400).send(`No post found with the path '${path}'.`);

	// Return OK
	res.send(result);
});

// Delete
router.delete(`${commentEndpoint}/:commentId`, auth, async (req, res) => {
	// Removing comment
	const result = await Classroom.updateOne(
		{ _id: req.params.id, "posts._id": req.params.postId },
		{ $pull: { "posts.$.comments": { _id: req.params.commentId } } }
	);
	const path = `classroom:${req.params.id}/post:${req.params.postId}/comment:${req.params.commentId}`;
	if (!result)
		return res
			.status(400)
			.send(`No comment found with the given path '${path}'.`);

	// Return OK
	res.send(result);
});

module.exports = router;
