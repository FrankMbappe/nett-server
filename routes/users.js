const express = require("express"); // Server
const debug = require("debug")("ns:routes::users"); // Debugger
const router = express.Router(); // Instead of creating a new server
const Joi = require("joi"); // Input validation
const User = require("../models/User");
const { users } = require("../data"); // Data
const { userTypes } = require("../config/nett"); // Account types

async function addUser(user) {
	try {
		const result = await user.save();
		debug(result);
		return result;
	} catch (exception) {
		for (field in exception.errors) {
			debug(exception.errors[field], "\n");
		}
	}
}
async function getUser(id) {
	try {
		const user = await User.findById(String(id));
		debug("A User has been retrieved: " + JSON.stringify(user));
		return user;
	} catch (error) {
		debug(error);
		return;
	}
}
async function getAllUsers() {
	const result = await User.find({}).sort("creationDate");
	return result;
}
async function updateUser(id, user) {
	try {
		const result = await User.findByIdAndUpdate(
			id, // ID
			{ $set: user }, // Update
			{ new: true } // Options
		);
		debug("A User has been updated: " + JSON.stringify(result));
		return result;
	} catch (error) {
		debug(error);
		return;
	}
}
async function deleteUser(id) {
	try {
		const user = User.findOneAndRemove({ _id: id });
		debug("A User has been deleted: " + JSON.stringify(user));
	} catch (error) {
		debug(error);
		return;
	}
}

/* Input validation */
function validateUser(user) {
	const schema = Joi.object({
		_type: Joi.string().equal(Object.values(userTypes)).required(),
		phone: Joi.string().min(3).required(),
	});
	return schema.validate(user);
}

//
// GETs
router.get("/", (_, res) => {
	res.send(getAllUsers());
});
router.get("/:id", (req, res) => {
	const user = getUser(req.params.id);

	if (!user)
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);
	else res.send(user);
});

//
// POSTs
router.post("/", (req, res) => {
	const { error } = validateUser(req.body);

	if (error)
		return res.status(400).send(error.details.map(({ message }) => message));

	// Everything is okay
	const user = addUser(req.body);

	res.send(user);
});

//
// PUTs
router.put("/:id", (req, res) => {
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
// DELETEs
router.delete("/:id", (req, res) => {
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

module.exports = router;
