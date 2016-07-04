'use strict';

var auth = require('../../components/authentication/auth');
var express = require('express');
var controller = require('./streamUrl.controller');

var router = express.Router();

router.get('/', auth.isAuthenticated, controller.index);

module.exports = router;
