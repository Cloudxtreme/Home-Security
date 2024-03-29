'use strict';

import config from '../../config/environment';
var auth = require('../../components/authentication/auth');
var express = require('express');
var controller = require('./sensorStatus.controller');

var router = express.Router();

router.get('/', auth.isAuthenticated, controller.index);
router.get('/:id', auth.isAuthenticated, controller.show);
// router.post('/', auth.isAuthenticated, controller.create);
// router.put('/:id', auth.isAuthenticated, controller.update);
router.patch('/:id', auth.isAuthenticated, controller.update);
// router.delete('/:id', auth.isAuthenticated, controller.destroy);

module.exports = router;
