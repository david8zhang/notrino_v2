var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
var test_database_name_user = 'test_notrino_users';
var database_name_user = 'notrino_users';

/** GET the user's profile based on the id. */
exports.getUser = function(req, res) {
	var user_id = req.query.user_id;
	var params = {};
	params.TableName = 'notrino_users';
	params.ExpressionAttributeValues = {
		":user_id" : user_id
	};
	params.FilterExpression = "user_id = :user_id";
	docClient.scan(params, function(err, data) {
		if(err) {
			res.status(400).send(err);
		} else {
			var response = {};
			var user ={};
			var user_id = data.Items[0].user_id;
			var email = data.Items[0].email;
			var username = data.Items[0].username;
			user.user_id = user_id;
			user.email = email;
			user.username = username;
			response.user = user;
			res.status(200).send(response);
		}
	})
};

/** POST a new test user, for testing purposes only. **/
exports.testUser = function(req, res) {
	var secret_code = req.body.secret_code;
	if(secret_code === 'rare_pepes') {
		var username = 'test_user';
		var password = 'password';
		var email = 'test_user@test_user.com';
		var user_id = '123456';
		var auth_token = sha1(Math.floor(Date.now() / 100).toString());
		var timestamp = Math.floor(Date.now() / 1000).toString();
		var params = {};
		params.TableName = 'notrino_users';
		params.Item = {
			user_id: user_id,
			username: username,
			email: email,
			password: password,
			auth_token: auth_token,
			timestamp: timestamp
		}
		docClient.put(params, function(err, data) {
			if(err) {
				console.log(err);
				res.status(400).send(err);
			} else {
				var response = {};
				var user = params.Item;
				response.user = user;
				res.status(200).send(response);
			}
		})
	} else {
		res.status(404).send("Error! Incorrect secret code!");
	}
}

/** POST a new user to the database. */
exports.createUser = function(req, res) {
	var user_id = sha1(Math.floor(Date.now() / 1000).toString());
	var email = req.body.email;
	var password = req.body.password;
	var username = req.body.username;
	var auth_token = sha1(Math.floor(Date.now() / 1000).toString());
	var timestamp = Math.floor(Date.now() / 1000).toString();
	var test = req.body.test;
	var database_name = database_name_user;

	if(test === 'on') {
		database_name = test_database_name_user;
	}

	var params = {};
	params.TableName = database_name;
	params.Item = {
		user_id: user_id,
		username: username,
		email: email,
		password: password,
		auth_token: auth_token,
		timestamp: timestamp
	};
	if(req.body.reg_token !== null) {
		params.reg_token = req.body.reg_token
	}
	docClient.put(params, function(err, data) {
		if(err) {
			res.status(400).send(err);
		} else {
			var response = {};
			var user = params.Item;
			response.user = user;
			res.status(200).send(response);
		}
	})
};

/** POST login information. */
exports.authUser = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var params = {};
	params.TableName = 'notrino_users';
	params.ExpressionAttributeValues = {
		":username" : username,
		":password" : password
	};
	params.FilterExpression = "username=:username AND password = :password";
	docClient.scan(params, function(err, data) {
		if(err) {
			res.status(400).send(err);
		} else {
			var user_raw = JSON.parse(JSON.stringify(data));
			if(user_raw["Count"] == 0) {
				res.status(403).send('Account does not exist!');
			} else {
				var response = {};
				var token = {};
				token.user_id = data.Items[0].user_id;
				token.auth_token = data.Items[0].auth_token;
				response.token = token;
				res.status(200).send(response);
			}
		}
	})
};

/** UPDATE User by attaching push_notifcation registration token. **/
exports.tokenizeUser = function(req, res) {
	var user_id = req.body.user_id;
	var reg_token = req.body.reg_token;
	var params = {};
	params.Key = {
		user_id: user_id
	};
	params.TableName = 'notrino_users';
	params.UpdateExpression = "set reg_token = :reg_token";
	params.ExpressionAttributeValues = {
		":reg_token" : reg_token
	};
	docClient.update(params, function(err, data) {
		if(err) {
			res.status(400).send(err);
		} else {
			res.status(200).send("Successfully updated user");
		}
	})
};