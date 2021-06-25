const express = require("express"); // Server
const Joi = require("joi"); // Input validation

const router = express.Router(); // Instead of creating a new server
const users = require("../datatest"); // Data

/* Input validation function */
function validateUser(user) {
	const schema = Joi.object({ value: Joi.string().min(3).required() });
	return schema.validate(user);
}

//
// GET
router.get("/api/users/", (_, res) => {
	res.send(users);
});
router.get("/api/users/:id", (req, res) => {
	const user = users.find((user) => user.id === parseInt(req.params.id));

	if (!user)
		return res
			.status(404)
			.send(`No existing user with the given ID '${req.params.id}'`);
	else res.send(user);
});

//
// POST
router.post("/api/users", (req, res) => {
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
router.put("/api/users/:id", (req, res) => {
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
router.delete("/api/users/:id", (req, res) => {
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
