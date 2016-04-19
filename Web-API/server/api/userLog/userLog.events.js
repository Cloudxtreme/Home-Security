/**
 * SensorStatus model events
 */

'use strict';

import {EventEmitter} from 'events';
var UserLog = require('./userLog.model');
var UserLogEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserLogEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UserLog.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UserLogEvents.emit(event + ':' + doc._id, doc);
    UserLogEvents.emit(event, doc);
  }
}

export default UserLogEvents;
