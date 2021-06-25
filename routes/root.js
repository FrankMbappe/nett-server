const express = require("express"); // Server

const router = express.Router(); // Instead of creating a new server

//
// GET
router.get("/", (_, res) => {
	res.send("Hello world");
});

module.exports = router;
