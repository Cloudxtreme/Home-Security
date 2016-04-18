/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sensorStatuses              ->  index
 * POST    /api/sensorStatuses              ->  create
 * GET     /api/sensorStatuses/:id          ->  show
 * PUT     /api/sensorStatuses/:id          ->  update
 * DELETE  /api/sensorStatuses/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import config from '../../config/environment';
var jwt = require('jwt-simple');
var User = require('../user/user.model');
var SensorStatus = require('./sensorStatus.model');

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

// Gets a list of SensorStatuses
export function index(req, res) {
  SensorStatus.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single SensorStatus from the DB
export function show(req, res) {
  SensorStatus.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new SensorStatus in the DB
export function create(req, res) {
  SensorStatus.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SensorStatus in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  SensorStatus.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a SensorStatus from the DB
export function destroy(req, res) {
  SensorStatus.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
