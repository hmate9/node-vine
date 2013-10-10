var vine = require("./lib/vine.js"),
	username = process.env.VINE_USERNAME,
	password = process.env.VINE_PASSWORD;

vine.login(username, password, function(err, response) {
	
	vine.popular(function(err, response) {
		// Works
	});
});
