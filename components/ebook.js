const path = require("path");
const xtend = require("xtend");
const convert = require("ebook-convert");

const generateEbook = () =>
	convert(
		{
			input: path.join(__dirname, "../output/index.html"),
			output: path.join(__dirname, "../output/ebook.mobi"),
			authors: `"${new Date()}"`,
			pageBreaksBefore: "//h:h1",
			chapter: "//h:h1",
			insertBlankLine: true,
			insertBlankLineSize: "1",
			changeJustification: "justify",
			mobiFileType: "both",
			lineHeight: "12",
			marginTop: "50",
			marginRight: "50",
			marginBottom: "50",
			marginLeft: "50",
		},
		function(err) {
			if (err) console.log(err);
		}
	);

module.exports = generateEbook;
