var async = require('async');
var util = require('util');
var Client = require('node-rest-client').Client;
var gcm = require('node-gcm');

exports.handler = function(event, context) {
	//Node restful stuff
	var client = new Client();
	var user_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/users/index?"
	var q_pool_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/questions/pools/index";
	var gcm_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/gcm?";
	var reg_tokens = [];
	var isComplete = false;

	//Asynchronous function waterfall
	async.waterfall([
		function upload(next) {
			client.get(q_pool_url, function(data, response) {
				var length = data.Items.length;
				for(var i = 0; i < length; i++) {
					console.log(i);
					var user_id = data.Items[i].user_id;
					if(data.Items[i].subscribed != "null") {
						client.get(user_url + "user_id=" + user_id, function(data, response) {
							var reg_token = data.Items[0].reg_token;
							client.get(gcm_url + "reg_token=" + reg_token + "&type=new", function(data, response) {
								console.log("Response: " + data);
							})
						})
					}
					if(i == length) {
						console.log("Success!");
						context.succeed("Success!");
					}
				}
			})
		}

	], function(err) {
		if(err) {
			context.fail(err);
		} else {
			context.succeed("Success!");
		}
	})
}