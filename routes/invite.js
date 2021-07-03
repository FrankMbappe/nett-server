const express = require("express"); // Server
const debug = require("debug")("ns:routes::users"); // Debugger
const router = express.Router(); // Instead of creating a new server

router.get("/:uuid", (req, res) => {
    
})