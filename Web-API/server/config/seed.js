/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var SensorNotification = require('../api/sensorNotification/sensorNotification.model');


SensorNotification.create({
    status: 'Red',
    message : 'Front Door Sensor 1'
  }, {
    status: 'Red',
    message : 'Front Door Sensor 2'
  }, {
    status: 'Yellow',
    message : 'Camera Offline'
  }, {
    status: 'Yellow',
    message : 'Camera Offline 2'
  }, {
   status: 'Green',
    message : 'Battery Low'
  }, {
    status: 'Green',
    message : 'Battery Low 2'
  });