const http = require("http");
const { VERSION } = require("lodash");

console.log(VERSION);

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.write("Hellow.. sir..");
	}
	if (req.url === "/api/courses") {
		res.write(JSON.stringify([1, 2, 3]));
	}
	if (req.url === "/lareine") {
		res.write(
			"<a href='https://www.google.com/search?client=firefox-b-d&q=dineo+moeketsi'>Dineo Moeketsi</a>"
		);
	}
	res.end();
});

server.listen(3000);

console.log("Listening on port 3000...");
