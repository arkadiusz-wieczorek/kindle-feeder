const path = require("path");
const xtend = require("xtend");
const convert = require("ebook-convert");

const options = {
	input: path.join(__dirname, "output/example.html"),
	output: path.join(__dirname, "example.mobi"),
	authors: `"${new Date()}"`,
	pageBreaksBefore: "//h:h1",
	chapter: "//h:h1",
	insertBlankLine: true,
	insertBlankLineSize: "1",
	// lineHeight: "12",
	// marginTop: "50",
	// marginRight: "50",
	// marginBottom: "50",
	// marginLeft: "50",
};

convert(options, function(err) {
	if (err) console.log(err);
});
