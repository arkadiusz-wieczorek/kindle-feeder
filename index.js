const getArticle = require("newspaperjs").Article;
const rssParser = require("rss-parser");
const html = require("node-html-parser").parse;
const getImage = require("./components/image.js");
const isOneDay = require("./components/time-helper.js");
const progressBar = require("./components/progress-bar.js");
const fs = require("fs");
const generateEbook = require("./components/ebook.js");

const state = {
	links: [],
	promises: [],
	entries: [],
	newspaper_content: html(`
		<!DOCTYPE html>
		<html>
			<head>
				<title>Daily newspaper</title>
				<meta charset="utf-8">
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			</head>
			<body>
				<h1>Daily newspaper</h1>
				<p>${new Date()}</p>
			</body>
		</html>
	`),
	downloaded: 0,
};

// currying function
const processContent = (article, resolve) => {
	return result => {
		progressBar((state.downloaded += 1), state.links.length);

		// add missing spaces
		const re = /((\w)|("|\?"|\."|,|'))(\.|\?|\,|\!){1}(\w)/g;
		const article_text = result.text.toString().replace(re, "$1$2 $3");

		const article_content = html(`
			<article>
				<center>
					<img src="./${article.id}.jpg" alt="${article.id}" />
				</center>
				<h2>${result.title}</h2>
				<p style="text-align: justify;">${article_text}</p>
			</article>
		`);

		getImage(
			`http:${result.topImage}`,
			`./output/${article.id}.jpg`,
			() => {
				resolve(article_content);
			}
		);
	};
};

const fetchArticle = article => {
	return new Promise((resolve, reject) => {
		getArticle(article.url)
			.then(processContent(article, resolve))
			.catch(reason => {
				console.log(reason);
				reject();
			});
	});
};

const createDocument = data => {
	return new Promise(function(resolve, reject) {
		state.entries = data;
		let body = state.newspaper_content.querySelector("body");
		for (let i = 0; i < state.entries.length; i++) {
			body.appendChild(state.entries[i]);
		}

		fs.writeFile("./output/index.html", state.newspaper_content, err => {
			if (err) throw err;
			console.log("HTML document has been saved!");
		});
		resolve();
	});
};
// http://wiadomosci.onet.pl/.feed
// https://www.engadget.com/rss.xml
rssParser.parseURL("http://wiadomosci.onet.pl/.feed", (err, parsed) => {
	console.log(`${new Date().getTime()}: start rss parser`);

	state.links = parsed.feed.entries
		.filter(entry => isOneDay(entry.pubDate))
		.map(entry => ({ id: entry.id, url: entry.link }))
		.reverse();

	console.log(`${new Date().getTime()}: ${state.links.length} articles`);

	state.promises = state.links.map(article => fetchArticle(article));
	Promise.all(state.promises)
		.then(result => createDocument(result))
		.then(() => generateEbook())
		.then(() => {
			console.log("created");
		});
});
