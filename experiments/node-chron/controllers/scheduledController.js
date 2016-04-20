/**
 * Created by david_000 on 4/19/2016.
 */
var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-1'});

/* Scheduled task to be cron-jobbed */
exports.task = function(name) {
    var params = {};
    params.TableName = 'scheduled-task';
    var task_id = sha1(Math.floor(Date.now()) / 1000).toString();
    var task_name = name;
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