var async = require('async');
var util = require('util');
var Client = require('node-rest-client').Client;
var gcm = require('node-gcm');

exports.handler = function(event, context) {
	//Google cloud messaging
	var API_KEY = "AIzaSyAd8KBTB4FZ-_18cCuf3q81Zsu6Yi_KElY";
	var sendID = "578010136131"
	var url = "https://gcm-http.googleapis.com/gcm/send";
	var rest_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1";
	var srcBucket = event.Records[0].s3.bucket.name;

	//Get the bucket name
	var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
	async.waterfall([
		function upload(next) {
			var reg_token = "";
			var client = new Client();
			var args = {
				parameters: {
					user_id: srcKey 
				}
			};
			client.get(rest_url + "/users/index", args, function(data, response) {
				reg_token = data.Items[0].reg_token;
			});
			var reg_tokens = [reg_token];
			var sender = new gcm.Sender(API_KEY);
			sender.send(message, { registrationTokens: regTokens }, function(err, response) {
				if(err) console.log(err);
				else console.log(response);
			});

			sender.sendNoRetry(message, {topic: '/topic/global'}, function(err, response) {
				if(err) console.log(err);
				else console.log(response);
			})

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