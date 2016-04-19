'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var UserLogSchema = new mongoose.Schema({
  username: String,
  successful: Boolean,
  ip: String,
  date: {type: Date, default: Date.now}
});

export default mongoose.model('UserLog', UserLogSchema);
