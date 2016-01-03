/**
 * SensorNotification model events
 */

'use strict';

import {EventEmitter} from 'events';
var SensorNotification = require('./sensorNotification.model');
var SensorNotificationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SensorNotificationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SensorNotification.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SensorNotificationEvents.emit(event + ':' + doc._id, doc);
    SensorNotificationEvents.emit(event, doc);
  }
}

export default SensorNotificationEvents;
