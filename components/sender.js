const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "xwzvgehxjj5hetuz@ethereal.email",
		pass: "vF3FZNg3eYd89svBrp",
	},
});

let mailOptions = {
	from: "", // sender address
	to: "", // list of receivers
	subject: "Hello ✔", // Subject line
	text: "Hello world?", // plain text body
	html: "<b>Hello world?</b>", // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log("Message sent: %s", info.messageId);
	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
