/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import SensorNotification from '../api/sensorNotification/sensorNotification.model';
import User from '../api/user/user.model';
var bcrypt = require('bcrypt');

User.find({}).removeAsync()
  .then(() => {
    bcrypt.hash('soccer', 10, function(err, hash) {
      User.create({
        username: 'Gabe',
        password: hash
      }, {
        username: 'Molly',
        password: hash
      });
    });
  });

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
