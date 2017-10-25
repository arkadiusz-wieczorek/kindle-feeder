const progressBar = (downloaded_items, all_items) => {
	process.stdout.write("▭");
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(
		`${"▬".repeat(downloaded_items)}${"▭".repeat(
			all_items - downloaded_items
		)}  ${downloaded_items}/${all_items} `
	);
};

module.exports = progressBar;
