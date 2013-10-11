var vine = require("./lib/vine.js"),
	username = process.env.VINE_USERNAME,
	password = process.env.VINE_PASSWORD;

vine.login(username, password, function(err, response) {
	
	vine.timeline(function(err, response) {
		// Works
	});

	vine.popular(function(err, response) {
		// Works
	});

	vine.promoted(function(err, response) {
		// Works
	});

	vine.tags("funny", function(err, response) {
		// Works
	});

	vine.search("cats", function(err, response) {
		// Works
	});

	vine.settings(function(err, response) {
		// Works
	});
});
