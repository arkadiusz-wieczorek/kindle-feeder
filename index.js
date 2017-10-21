const getArticle = require("newspaperjs").Article;
const rssParser = require("rss-parser");
const html = require("node-html-parser").parse;

const state = {
	links: [],
	promises: [],
	entries: [],
	newspaper_content: html(`
								<html>
									<head>
										<meta charset="utf-8">
										<title>Daily newspaper</title>
									</head>
									<body>
										<h1>Daily newspaper</h1>
										<p>${new Date()}</p>
									</body>
								</html>
							`),
};

const fetchArticle = link => {
	return new Promise((resolve, reject) => {
		getArticle(link)
			.then(result => {
				console.log("GET", result.date, result.title);
				const article = html(`
										<article>
											<img src="http:${result.topImage}">
											<h2>${result.title}</h2>
											<p style="text-align: justify;">${result.text}</p>
											<hr>
										</article>
									`);
				resolve(article);
			})
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
	state.links = parsed.feed.entries.map(entry => entry.link).reverse();
	state.promises = state.links.map(link => fetchArticle(link));

	Promise.all(state.promises).then(result => {
		createDocument(result);
	});
});
