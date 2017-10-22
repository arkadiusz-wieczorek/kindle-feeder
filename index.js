const getArticle = require("newspaperjs").Article;
const rssParser = require("rss-parser");
const html = require("node-html-parser").parse;
const getImage = require("./components/image.js");

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
};

// currying function
const processContent = (article, resolve) => {
	return result => {
		console.log("GET", result.date, result.title);
		const article_content = html(`
			<article>
				<img src="${article.id}.jpg" alt="${article.id}" />
				<h2>${result.title}</h2>
				<p style="text-align: justify;">${result.text}</p>
			</article>
			<mbp:pagebreak/>
			`);

		getImage(`http:${result.topImage}`, `${article.id}.jpg`, () => {
			console.log(`GET image ${article.id}`);
			resolve(article_content);
		});
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
	state.entries = data;
	let body = state.newspaper_content.querySelector("body");
	for (let i = 0; i < state.entries.length; i++) {
		body.appendChild(state.entries[i]);
	}
	console.log(state.newspaper_content.toString());
};

rssParser.parseURL("http://wiadomosci.onet.pl/.feed", (err, parsed) => {
	state.links = parsed.feed.entries
		.map(entry => ({ id: entry.id, url: entry.link }))
		.reverse();
	state.promises = state.links.map(article => fetchArticle(article));
	Promise.all(state.promises).then(result => {
		createDocument(result);
	});
});
