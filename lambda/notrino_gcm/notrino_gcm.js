var async = require('async');
var util = require('util');
var Client = require('node-rest-client').Client;

exports.handler = function(event, context) {
	//Google cloud messaging
	var API_KEY = "AIzaSyAd8KBTB4FZ-_18cCuf3q81Zsu6Yi_KElY";
	var sendID = "578010136131"
	var url = "https://gcm-http.googleapis.com/gcm/send";
	var rest_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1";
	var srcBucket = event.Records[0].s3.bucket.name;

	//Get rid of this
	var reg_token = "dh-L2Ibng58:APA91bG9Ymq6CDWcEgMiU80R-hFzlvKK_xzpeSMJxbha3TAWCbxPIoaqRIexQCgVEIhN5NuViLfRGkoHMvXh74mHRwyyWYHfTqxvO66epxwiI3wLp_4NwMbXP7sexVyCkNjUCqRZLXY_"

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
			// client.get(rest_url + "/users/index", args, function(data, response) {
			// 	reg_token = data.Items[0].reg_token;
			// 	var newArgs = {
			// 		parameters: {
			// 			"to": reg_token,
			// 			"notification": {
			// 				"body": "Hello from server!",
			// 				"title": "Hello from server!",
			// 				"sound": "default",
			// 				"click_action": "OPEN_MAIN_ACTIVITY"
			// 			},
			// 			"data": {
			// 				"message" : "Hello!"
			// 			} 
			// 		},
			// 		headers: {
			// 			"Authorization": "key=" + API_KEY,
			// 			"Content-Type": "application/json"
			// 		}
			// 	};
			// 	client.post(url, newArgs, function(data, response) {
			// 		console.log(response);
			// 		console.log(data);
			// 	});
			// });
			var args = {
				parameters: {
					to: reg_token,
					notification: {
						body: "Hello from server!",
						title: "Hello from server!",
						sound: "default",
						click_action: "OPEN_MAIN_ACTIVITY"
					},
					data: {
						message: "Hello!"
					}
				},
				headers: {
					"Authorization":"key=AIzaSyAd8KBTB4FZ-_18cCuf3q81Zsu6Yi_KElY",
					"Content-Type": "application/json"
				}
			}
			client.post(url, args, function(data, response) {
				console.log(response);
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