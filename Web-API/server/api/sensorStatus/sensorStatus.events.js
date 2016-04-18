/**
 * SensorStatus model events
 */

'use strict';

import {EventEmitter} from 'events';
var SensorStatus = require('./sensorStatus.model');
var SensorStatusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SensorStatusEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SensorStatus.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SensorStatusEvents.emit(event + ':' + doc._id, doc);
    SensorStatusEvents.emit(event, doc);
  }
}

export default SensorStatusEvents;
