const path = require("path");
const fs = require("fs");
const exec = require("child_process").exec;

const generateEbook = () =>
	new Promise(function(resolve, reject) {
		exec(
			`kindlegen ${path.join(
				__dirname,
				"../output/index.html"
			)} -c0 -verbose -o "ebook.mobi"`,
			(error, stdout, stderr) => {
				console.log(
					`${new Date().getTime()}: ebook has been generated`
				);

				resolve();
			}
		);
	});

module.exports = generateEbook;
