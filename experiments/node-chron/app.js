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
var scheduledController = require('./controllers/scheduledController.js');

/* Create a new database object (Asynchronous API request) */
var cron1 = cron.job("0 * * * * *", scheduledController.createData);

/* Query an in-house API (Asynchronous API request) */
var cron2 = cron.job("*/5 * * * * *", scheduledController.task);

cron1.start();
cron2.start();

app.listen(port);
console.log('Listening on port ' + port);
exports = module.exports = app;




