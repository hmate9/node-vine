"use strict";

var assert = require("assert"),
vine = require("../lib/vine.js");

describe("login", function () {

	var username = process.env.VINE_USERNAME,
	password = process.env.VINE_PASSWORD;

	var user = new vine.VineUser(username, password);

	it("should login via POST /users/authenticate", function (next) {
		user.login(function (err, response) {
			assert.ok(!err);
			assert.ok(response.key);
			next();
		});
	});

	it("should read username and password from environment variables", function (next) {
		var user = new vine.VineUser(null, null);
		user.login(function (err, response) {
			assert.ok(!err);
			assert.ok(response.key);
			next();
		});
	});

	it("should read password from environment variables", function (next) {
		var user = new vine.VineUser(username, null);
		user.login(function (err, response) {
			assert.ok(!err);
			assert.ok(response);
			next();
		});
	});

	it("should read username from environment variables", function (next) {
		var user = new vine.VineUser(null, password);
		user.login(function (err, response) {
			assert.ok(!err);
			assert.ok(response);
			next();
		});
	});

	it("should fail if wrong username is entered", function (next) {
		var user = new vine.VineUser("asdfasDafsasdf", password);
		user.login(function (err, response) {
			assert.ok(err.message === "Username/password are incorrect.");
			assert.ok(!response);
			next();
		});
	});

	it("should fail if wrong password is entered", function (next) {
		var user = new vine.VineUser(username, "adasdasdsa");
		user.login(function (err, response) {
			assert.ok(err.message === "Username/password are incorrect.");
			assert.ok(!response);
			next();
		});
	});
});
