/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/session              ->  create
 */

'use strict';
var UserLog = require('./userLog.model');


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
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


// Gets a list of sessions
export function index(req, res) {
  UserLog.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}
