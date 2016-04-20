var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

/** GET the Question pools. */
exports.getQPool = function(req, res) {
	var qpool_id = req.query.qpool_id;
	var params = {};
	params.TableName = 'notrino_question_pool';
	params.FilterExpression = "question_pool_id = :qpool_id"
	params.ExpressionAttributeValues = {
		":qpool_id" : qpool_id
	};
	docClient.scan(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.json(data);
		}
	})
};

/** POST a new Question pool to the database. */
exports.createQPool = function(req, res) {
	var qpool_id = sha1(Math.floor(Date.now() / 1000).toString());
	var qpool_name = req.body.qpool_name;
	var questions = [];
	var params = {};
	params.TableName = 'notrino_question_pool';
	params.Item = {
		question_pool_id: qpool_id,
		qpool_name: qpool_name,
		questions: questions
	}
	docClient.put(params,function(err, data) {
		if(err) {
			res.send(err);
		} else {
			var response = {};
			response.qpool_id = qpool_id;
			res.send(response);
		}
	})
}