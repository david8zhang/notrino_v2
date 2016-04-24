var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

/** GET The questions .*/
exports.getQuestion = function(req, res) {
	var question_id = req.query.question_id;
	var params = {};
	params.TableName = 'notrino_questions';
	params.FilterExpression = 'question_id = :question_id';
	params.ExpressionAttributeValues = {
		":question_id" : question_id
	};
	docClient.scan(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.json(data);
		}
	})
};

/** POST a new Question to the database. */
exports.createQuestion = function(req, res) {

	var question_id = sha1(Math.floor(Date.now() / 1000).toString());
	var text = req.body.text;
	var question_pool_id = req.body.question_pool_id;
	var answer = req.body.answer;
	var choices = req.body.choices;
	var params = {};
	params.TableName = 'notrino_questions';
	params.Item = {
		question_id: question_id,
		text: text,
		answer: answer,
		question_pool_id: question_pool_id
	}
	docClient.put(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			var response = {};
			response.question_id = question_id;
			res.send(response);
		}
	})
};