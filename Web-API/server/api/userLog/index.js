'use strict';

var express = require('express');
var controller = require('./userLog.controller');
var auth = require('../../components/authentication/auth');

var router = express.Router();

router.get('/', auth.isAuthenticated, controller.index);

module.exports = router;
