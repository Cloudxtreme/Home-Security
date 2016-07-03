/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/streamUrl              ->  index
 */

'use strict';

import _ from 'lodash';
import config from '../../config/environment';
var jwt = require('jwt-simple');

var secretKey = config.secrets.session;

// Returns the url of the stream server 
export function index(req, res) {
  if (process.env['STREAMSERVER_URL']) {
    res.status(200).json({ url: process.env['STREAMSERVER_URL'] });
  }
  else {
    res.status(500).end();
  }
  return;
}


