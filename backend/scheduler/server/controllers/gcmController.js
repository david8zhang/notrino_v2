/**
 * Created by david_000 on 4/24/2016.
 */
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
var gcm = require('node-gcm');
var API_KEY = "AIzaSyC9AaQPHRfB6-418kyV_swuROqty0kGKbM";

exports.sendMessage = function() {
    var params = {};
    params.TableName = "notrino_users";
    docClient.scan(params, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            var reg_tokens = [];
            for(var i = 0, len = data.Items.length; i < len; i++) {
                if(data.Items[i].reg_token !== 'null') {
                    reg_tokens.push(data.Items[i].reg_token);
                }
            }
            var message = new gcm.Message();
            var sender = new gcm.Sender(API_KEY);
            sender.send(message, {registrationTokens: reg_tokens}, function(err, response) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(response);
                }
            });
        }
    })
};

