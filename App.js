const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./startup/logging")(); // Handling and logging errors
require("./startup/config")(); // Checking environment variables
require("./startup/db")(); // Connecting to the database
require("./startup/validation")(); // Setting up validation properties
require("./startup/routes")(app); // Setting up routes and middleware
require("./startup/hello")(app); // Finally, saying hello.

app.listen(port, "192.168.8.100", () =>
	console.log(`Nett-Server is listening port ${port}...`)
);
