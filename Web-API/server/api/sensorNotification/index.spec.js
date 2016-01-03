'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sensorNotificationCtrlStub = {
  index: 'sensorNotificationCtrl.index',
  show: 'sensorNotificationCtrl.show',
  create: 'sensorNotificationCtrl.create',
  update: 'sensorNotificationCtrl.update',
  destroy: 'sensorNotificationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sensorNotificationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sensorNotification.controller': sensorNotificationCtrlStub
});

describe('SensorNotification API Router:', function() {

  it('should return an express router instance', function() {
    sensorNotificationIndex.should.equal(routerStub);
  });

  describe('GET /api/sensorNotifications', function() {

    it('should route to sensorNotification.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sensorNotificationCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/sensorNotifications/:id', function() {

    it('should route to sensorNotification.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sensorNotificationCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/sensorNotifications', function() {

    it('should route to sensorNotification.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sensorNotificationCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/sensorNotifications/:id', function() {

    it('should route to sensorNotification.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'sensorNotificationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sensorNotifications/:id', function() {

    it('should route to sensorNotification.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'sensorNotificationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sensorNotifications/:id', function() {

    it('should route to sensorNotification.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sensorNotificationCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
