const cleanOutput = require("./components/clean-output.js");
const generateEbook = require("./components/ebook.js");
generateEbook().then(cleanOutput().then(console.log("oki")));
