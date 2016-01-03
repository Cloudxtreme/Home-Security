'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SensorNotificationSchema = new mongoose.Schema({
  status: String,
  message: String,
  date: {type: Date, default: Date.now}
});

export default mongoose.model('SensorNotification', SensorNotificationSchema);
