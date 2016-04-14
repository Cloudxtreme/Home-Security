/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sensorNotifications              ->  index
 * POST    /api/sensorNotifications              ->  create
 * GET     /api/sensorNotifications/:id          ->  show
 * PUT     /api/sensorNotifications/:id          ->  update
 * DELETE  /api/sensorNotifications/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import config from '../../config/environment';
var jwt = require('jwt-simple');
var User = require('../user/user.model');
var SensorNotification = require('./sensorNotification.model');

var secretKey = config.secrets.session;


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.sendStatus(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of SensorNotifications
export function index(req, res) {
  SensorNotification.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single SensorNotification from the DB
export function show(req, res) {
  SensorNotification.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new SensorNotification in the DB
export function create(req, res) {
  SensorNotification.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SensorNotification in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  SensorNotification.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a SensorNotification from the DB
export function destroy(req, res) {
  SensorNotification.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
