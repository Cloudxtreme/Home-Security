'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SensorNotificationSchema = new mongoose.Schema({
  level: String,
  status: String,
  title: String,
  description: String,
  date: {type: Date, default: Date.now}
});

export default mongoose.model('SensorNotification', SensorNotificationSchema);
