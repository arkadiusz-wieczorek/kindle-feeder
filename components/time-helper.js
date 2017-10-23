const moment = require("moment");

const oneDayDiff = some_time => {
	const now = moment().format("YYYY-MM-DD");
	const chosen_time = moment(some_time.substring(0, 10));

	return chosen_time.from(now) === "a day ago" ? true : false;
};

module.exports = oneDayDiff;
