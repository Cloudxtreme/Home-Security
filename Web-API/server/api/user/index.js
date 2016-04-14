'use strict';


var express = require('express');
var auth = require('../../components/authentication/auth');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.find);
router.post('/', auth.isAuthenticated, controller.create);

module.exports = router;
