/**
 * Created by david_000 on 4/19/2016.
 */
var Client = require('node-rest-client').Client;
var api_url = "https://autometrica-api.herokuapp.com/api/v1/data/index?data_id=8def2e5ec7ff524856c825a78207df85fd377438";
var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-1'});

exports.task = function() {
    var client = new Client();
    client.get(api_url, function(data, response) {
        console.log(data);
    })
}

exports.createData  = function() {
    var params = {};
    params.TableName = 'scheduled-task';
    var task_id = Date.now().toString();
    var task_name = "Hello world!";
    var timestamp = Math.floor(Date.now() / 1000).toString();
    params.Item = {
        task_id: task_id,
        task_name: task_name,
        timestamp: timestamp
    };
    docClient.put(params, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log("Success!");
        }
    })
}

