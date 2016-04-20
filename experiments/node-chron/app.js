/**
 * Created by david_000 on 4/19/2016.
 */
/*
* @Author: David Zhang
* @Description: A Cron-scheduler running on NodeJS Express Server
**/
var express = require('express');
var app = express();
var cron = require('cron');
var port = process.env.PORT || 8800;
var scheduledTask = require('./controllers/scheduledController.js');
var cronJob = cron.job("0 * * * * *", scheduledTask.task("new task!"));
cronJob.start();

app.listen(port);
console.log('Listening on port ' + port);
exports = module.exports = app;




