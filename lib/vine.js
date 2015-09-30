"use strict";

var request = require("request"),
querystring = require("querystring"),
settings = require("./settings"),
JSONbig = require('json-bigint');

function VineUser(email, password) {
	this.email = email || process.env.VINE_USERNAME;
	this.password = password || process.env.VINE_PASSWORD;
	this.headers = settings.HEADERS;
}

exports.VineUser = VineUser;

VineUser.prototype.make_request = function(endpoint, data, callback) {

	if (typeof data === "function") {
		return this.make_request(endpoint, null, data);
	}

	var req = {
		uri: settings.BASE_URL + endpoint,
		method: (data ? "POST" : "GET"),
		headers: this.headers
	};

	if (data) {
		req.body = querystring.stringify(data);
	}

	request(req, handle_response(callback));
}

function handle_response(callback) {
	return function (error, response, body) {
		var code, message;
		if (response && response.statusCode > 400) {
			code = response.statusCode;
			message = "HTTP Error Code " + code + " was returned.";
		}
		if (body) {
			try {
				body = JSONbig.parse(body);
			} catch (e) {
				message = "Response from Vine API is malformed.";
			}
		} else {
			message = "No response from Vine API was received.";
		}

		if (code || message) {
			return callback({
				code: code,
				message: message
			}, null);
		} else {
			return callback(null, body.data);
		}
	};
}


VineUser.prototype.login = function (callback) {
	var user = this;
	user.make_request("users/authenticate", {
		username: this.email,
		password: this.password
	}, function (error, response) {
		// Set session key for subsequent requests
		if (response === "") {
			callback(new Error("Username/password are incorrect."), null);
			return;
		}
		user.session = response.key;
		user.headers["vine-session-id"] = response.key;
		callback(error, response);
	});
}

VineUser.prototype.settings = function (callback) {
	this.make_request("users/me", callback);
}

VineUser.prototype.timeline = function (callback) {
	this.make_request("timelines/graph", callback);
}

VineUser.prototype.popular = function (callback) {
	this.make_request("timelines/popular", callback);
}

VineUser.prototype.promoted = function (callback) {
	this.make_request("timelines/promoted", callback);
}

VineUser.prototype.tags = function (tag, callback) {
	this.make_request("timelines/tags/" + tag, callback);
}

VineUser.prototype.search = function (query, callback) {
	this.make_request("users/search/" + query, callback);
}

VineUser.prototype.follow = function (id, callback) {
	this.make_request("users/"+id+"/followers", [], callback);
}
