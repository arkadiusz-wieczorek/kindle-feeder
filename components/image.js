const request = require("request");
const fs = require("fs");

const getImage = (uri, filename, callback) => {
	request.head(uri, (err, res, body) => {
		if (err) callback(err, filename);
		else {
			const stream = request(uri);
			stream
				.pipe(
					fs.createWriteStream(filename).on("error", err => {
						callback(err, filename);
						// stream.read();
					})
				)
				.on("close", () => {
					callback(null, filename);
				});
		}
	});
};

module.exports = getImage;
