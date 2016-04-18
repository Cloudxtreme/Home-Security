'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SensorStatusSchema = new mongoose.Schema({
  id: String,
  status: String,
  description: String,
  date: {type: Date, default: Date.now}
});

export default mongoose.model('SensorStatus', SensorStatusSchema);
