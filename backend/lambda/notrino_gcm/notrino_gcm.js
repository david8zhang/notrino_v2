var async = require('async');
var util = require('util');
var Client = require('node-rest-client').Client;
var gcm = require('node-gcm');

exports.handler = function(event, context) {
	//Google cloud messaging
	var API_KEY = "AIzaSyAd8KBTB4FZ-_18cCuf3q81Zsu6Yi_KElY";
	var rest_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1";
	var srcBucket = event.Records[0].s3.bucket.name;

	//Get the bucket name
	var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
	async.waterfall([
		function upload(next) {
			console.log("Key: " + srcKey);
			var reg_token = "";
			var client = new Client();
			var args = {
				parameters: {
					user_id: srcKey 
				}
			}
			client.post(rest_url + "/gcm", function(data, response) {
				console.log(data);
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