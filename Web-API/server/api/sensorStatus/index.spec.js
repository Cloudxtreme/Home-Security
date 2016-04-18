'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sensorStatusCtrlStub = {
  index: 'sensorStatusCtrl.index',
  show: 'sensorStatusCtrl.show',
  create: 'sensorStatusCtrl.create',
  update: 'sensorStatusCtrl.update',
  destroy: 'sensorStatusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sensorStatusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sensorStatus.controller': sensorStatusCtrlStub
});

describe('SensorStatus API Router:', function() {

  it('should return an express router instance', function() {
    sensorStatusIndex.should.equal(routerStub);
  });

  describe('GET /api/sensorStatuses', function() {

    it('should route to sensorStatus.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sensorStatusCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/sensorStatuses/:id', function() {

    it('should route to sensorStatus.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sensorStatusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/sensorStatuses', function() {

    it('should route to sensorStatus.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sensorStatusCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/sensorStatuses/:id', function() {

    it('should route to sensorStatus.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'sensorStatusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sensorStatuses/:id', function() {

    it('should route to sensorStatus.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'sensorStatusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sensorStatuses/:id', function() {

    it('should route to sensorStatus.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sensorStatusCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
