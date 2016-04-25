/*
* @Author: David Zhang
* @Description: A NodeJS Cron Server for sending out distributed GCM messages.
* */
var express = require('express');
var app = express();
var cron = require('cron');
var port = process.env.PORT || 8800;
var gcmController = require('./controllers/gcmController.js');

var gcm_job = cron.job("*/15 * * * * *", gcmController.sendMessage);
gcm_job.start();

app.listen(port);
console.log('Listening on port ' + port);
exports = module.exports = app;

