var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

/** GET the user based on the id. */
exports.getUser = function(req, res) {
	var user_id = req.query.user_id;
	params = {};
	params.TableName = 'notrino_users';
	params.FilterExpression = "user_id = :user_id";
	params.ExpressionAttributeValues = {
		":user_id" : user_id
	};
	docClient.scan(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.json(data);
		}
	})
};

/** POST a new test user, for testing purposes only. **/
exports.testUser = function(req, res) {
	res.status(400).send("Need to implement!!");
}

/** POST a new user to the database. */
exports.createUser = function(req, res) {
	var user_id = sha1(Math.floor(Date.now() / 1000).toString());
	var email = req.body.email;
	var password = req.body.password;
	var params = {};
	params.TableName = 'notrino_users';
	params.Item = {
		user_id: user_id,
		email: email,
		password: password
	}
	if(req.body.reg_token !== null) {
		params.reg_token = req.body.reg_token
	}
	docClient.put(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.status(200).send("Success! User was created!");
		}
	})
};

/** POST login information. */
exports.authUser = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var params = {};
	params.TableName = 'notrino_users';
	params.FilterExpression = "email=:email AND password = :password";
	params.ExpressionAttributeValues = {
		":email" : email,
		":password" : password
	}
	docClient.scan(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			var response = {};
			response.user_id = data.Items[0].user_id;
			res.send(response);
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
			res.send(err);
		} else {
			res.status(200).send("Successfully updated user");
		}
	})
};