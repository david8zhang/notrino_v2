var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

/** POST a new test question. **/
exports.createTestQuestion = function(req, res) {
	var secret_code = req.body.secret_code;
	if (secret_code === 'rare_pepes') {
		var params = {};
		var choices = docClient.createSet(["choice 1", "choice 2", "choice 3"]);
		params.TableName = 'notrino_questions';
		params.Item = {
			question_id: "123456",
			user_id: "123456",
			text: "sample question",
			tag: "qpool_1",
			answer: "sample answer",
			choices: choices
		};
		docClient.put(params, function(err) {
			if(err) {
				res.status(404).send(err);
			} else {
				var response = {};
				response.question = params.Item;
				res.status(200).send(response);
			}
		});
	} else {
		res.status(400).send(err);
	}
};

/** GET a single question based on question_id.*/
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
			res.status(400).send(err);
		} else {
			var response = {};
			var question = {};
			question.question_id = data.Items[0].question_id;
			question.text = data.Items[0].text;
			question.answer = data.Items[0].answer;
			question.choices = data.Items[0].choices;
			question.tag = data.Items[0].tag;
			question.user_id = data.Items[0].user_id;
			response.question = question;
			res.status(200).send(response);
		}
	})
};

/** GET a question based on the question tag. **/
exports.queryTagQuestion = function(req, res) {
	var tag = req.query.tag;
	var params = {};
	params.TableName = 'notrino_questions';
	params.FilterExpression = 'tag = :tag';
	params.ExpressionAttributeValues = {
		":tag": tag
	};
	docClient.scan(params, function(err, data) {
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			var response = {};
			var questions = [];
			for (var i = 0, len = data.Items.length; i < len; i++) {
				var question = {};
				question.question_id = data.Items[i].question_id;
				question.text = data.Items[i].text;
				question.answer = data.Items[i].answer;
				question.choices = data.Items[i].choices;
				question.tag = data.Items[i].tag;
				question.user_id = data.Items[i].user_id;
				questions.push(question);
			}
			response.questions = questions;
			res.status(200).send(response);
		}
	})
};

/** GET a question based on the user_id. **/
exports.queryUserQuestion = function(req, res) {
	var user_id = req.query.user_id;
	var params = {};
	params.TableName = 'notrino_questions';
	params.FilterExpression = 'user_id = :user_id';
	params.ExpressionAttributeValues = {
		":user_id": user_id
	};
	docClient.scan(params, function(err, data) {
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			var response = {};
			var questions = [];
			for (var i = 0, len = data.Items.length; i < len; i++) {
				var question = {};
				question.question_id = data.Items[i].question_id;
				question.text = data.Items[i].text;
				question.answer = data.Items[i].answer;
				question.choices = data.Items[i].choices;
				question.tag = data.Items[i].tag;
				question.user_id = data.Items[i].user_id;
				questions.push(question);
			}
			response.questions = questions;
			res.status(200).send(response);
		}
	})
}

/** DELETE A question based on the question_id. **/
exports.deleteQuestion = function(req, res) {
	var question_id = req.body.question_id;
	var params = {};
	params.TableName = 'notrino_questions';
	params.Key = {
		question_id: question_id
	};
	docClient.delete(params, function(err, data) {
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.status(200).send("Successfully deleted question!");
		}
	})
}

/** POST a new Question to the database. */
exports.createQuestion = function(req, res) {
	var question_id = sha1(Math.floor(Date.now() / 1000).toString());
	var text = req.body.text;
	var question_pool_id = req.body.question_pool_id;
	var answer = req.body.answer;
	var user_id = req.body.user_id;
	var tag = req.body.tag;
	var choices = docClient.createSet(req.body.choices);
	var params = {};
	params.TableName = 'notrino_questions';
	params.Item = {
		question_id: question_id,
		text: text,
		answer: answer,
		user_id: user_id,
		tag: tag,
		choices: choices,
		question_pool_id: question_pool_id
	};
	docClient.put(params, function(err, data) {
		if(err) {
			res.status(400).send(err);
		} else {
			var response = {};
			response.question = params.Item;
			res.status(200).send(response);
		}
	})
};