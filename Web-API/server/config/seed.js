/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import SensorNotification from '../api/sensorNotification/sensorNotification.model';
import User from '../api/user/user.model';
var bcrypt = require('bcrypt');

User.find({}).removeAsync().then(() => {
  bcrypt.hash('soccer', 10, function(err, hash) {
    User.create({
      username: 'gabeP',
      fullname: 'Gabe Harms',
      password: hash
    }, {
      username: 'mollyK',
      fullname: 'Molly Harms',
      password: hash
    });
  });
});

SensorNotification.find({}).removeAsync().then(() => {
  SensorNotification.create({
      level: 'red',
      status: 'Open',
      title : 'Front Door Sensor 1',
      description: 'Arduino has detected that the sensor on door 1 has gone off.'
    }, {
      level: 'yellow',
      status: 'Open',
      title : 'Camera Offline',
      description: 'Raspberry Pi has detected that the camera went offline for unknown reasons'
    }, {
      level: 'green',
      status: 'Open',
      title : 'Battery Low',
      description: 'Arduino has detected that its battery is runnign low. It is currently at about 10%'
    }, {
      level: 'yellow',
      status: 'Open',
      title : 'Camera Offline 2',
      description: 'Raspberry Pi has detected that the camera went offline for unknown reasons'
    }, {
      level: 'red',
      status: 'Open',
      title : 'Front Door Sensor 2',
      description: 'Arduino has detected that the sensor on door 2 has gone off.'
    }, {
      level: 'green',
      status: 'Open',
      title : 'Battery Low 2',
      description: 'Arduino has detected that its battery is runnign low. It is currently at about 5%'
    });
  });
