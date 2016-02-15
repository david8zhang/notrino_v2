var async = require('async');
var util = require('util');
var Client = require('node-rest-client').Client;
var gcm = require('node-gcm');

exports.handler = function(event, context) {
	var srcBucket = event.Records[0].s3.bucket.name;
	var gcm_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/gcm?"
	var rest_url = "https://infinite-anchorage-62838.herokuapp.com/api/v1/users/index?"
	var client = new Client();

	//Get the bucket name
	var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
	console.log("Srckey:" + srcKey);
	var user_id = srcKey.substring(0, srcKey.indexOf("&"));
	var qpool_id = srcKey.substring(srcKey.indexOf("&") + 1);
	console.log("User id: " + user_id);
	console.log("Question Pool Id " + qpool_id);
	async.waterfall([
		function upload(next) {
			client.get(rest_url + "user_id=" + user_id, function(data, response) {
				var reg_token = data.Items[0].reg_token;
				console.log(data.Items);
				gcm_url = gcm_url + "reg_token=" + reg_token + "&qpool_id=" + qpool_id + "&user_id=" + user_id + "&type=" + "subscribe"; 
				console.log(gcm_url);
				client.get(gcm_url, function(data, response) {
					console.log("Response:" + data);
					context.succeed("Completed");
				})
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