/**
 * Created by david_000 on 4/24/2016.
 */
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'});
var gcm = require('node-gcm');

exports.sendMessage = function() {
    var params = {};
    params.TableName = 'notrino_users';
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
            distributeMessage(reg_tokens);
        }
    })
};

function distributeMessage(reg_tokens) {
    for (var i = 0, len = reg_tokens; i < len; i++) {

    }
}