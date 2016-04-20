/**
 * Created by david_000 on 4/19/2016.
 */
/*
* @Author: David Zhang
* @Description: A Cron-scheduler running on NodeJS Express Server
**/
var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-1'});
var express = require('express');
var app = express();
var cron = require('cron');
var port = process.env.PORT || 8800;
var cronJob = cron.job("* * * * * *", function() {
    var params = {};
    params.TableName = 'scheduled-task';
    var task_id = sha1(Math.floor(Date.now()) / 1000).toString();
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
});
cronJob.start();

app.listen(port);
console.log('Listening on port ' + port);
exports = module.exports = app;




