const path = require("path");
const fs = require("fs");
const exec = require("child_process").exec;

const cleanOutput = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			exec(
				`rm ${path.join(__dirname, "../output/*.jpg")} ${path.join(
					__dirname,
					"../output/ebook.mobi"
				)} ${path.join(__dirname, "../output/index.html")}`,
				(error, stdout, stderr) => {
					console.log(`${new Date().getTime()}: clean output`);
					resolve();
				}
			);
		}, 3000);
	});
};

module.exports = cleanOutput;
