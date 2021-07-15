const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const { Comment, validate } = require("../models/Comment");
const { Classroom } = require("../models/Classroom");

// Get
router.get("/", auth, async (req, res) => {
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
router.get("/:commentId", auth, async (req, res) => {
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
router.post("/", auth, async (req, res) => {
	// Input validation
	const commentToAdd = { author: req.user._id, ...req.body };
	const { error } = validate(commentToAdd);
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
router.delete("/:commentId", auth, async (req, res) => {
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
