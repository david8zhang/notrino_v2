var async = require('async');
var util = require('util');
var Client = require('node-rest-client').Client;
var gcm = require('node-gcm');

exports.handler = function(event, context) {
	//Node restful stuff
	var client = new Client();
	var qpools_rest_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/questions/pools/index";
	var questions_rest_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/questions/single/all?";
	var gcm_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/gcm";
	var qpool_ids = []; 
	
	//Asynchronous function waterfall
	async.waterfall([
		function upload(next) {
			client.get(qpools_rest_url, function(data, response) {
				for(var i = 0; i < data.Items.length; i++) {
					var qpool_id = data.Items[i].question_pool_id;
					console.log(qpool_id);
					qpool_ids.push(qpool_id);
				}
				for(var i = 0; i < qpool_ids.length; i++) {
					var question_id = qpool_ids[i];
					console.log(question_id);
					client.get(questions_rest_url + "question_pool_id=" + question_id, function(data, response) {
						if(data.Items.length > 0) {
							for(var i = 0; i < data.Items.length; i++) {
								var text = data.Items[i].text;
								var answer = data.Items[i].answer;
								var question_id = data.Items[i].question_id;
								var choices = data.Items[i].choices;
								var question_pool_id = data.Items[i].question_pool_id;
								var args = {
									parameters: {
										text: text,
										answer: answer,
										question_id: question_id,
										choices: choices,
										question_pool_id: question_pool_id
									}
								}
								client.post(gcm_url, args, function(data, response) {
									console.log(data);
								})
							}
						}

					})
				}
			});
		}

	], function(err) {
		if(err) {
			console.log('got an error');
			console.log(err, err.stack);
		} else {
			console.log("Success!");
		}
	})
}