'use strict';

var app = require('../..');
import request from 'supertest';

var newSensorStatus;

describe('SensorStatus API:', function() {

  describe('GET /api/sensorStatuses', function() {
    var sensorStatuses;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensorStatuses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorStatuses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sensorStatuses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sensorStatuses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sensorStatuses')
        .send({
          level: 'New SensorStatus',
          title: 'This is the brand new sensorStatus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSensorStatus = res.body;
          done();
        });
    });

    it('should respond with the newly created sensorStatus', function() {
      newSensorStatus.level.should.equal('New SensorStatus');
      newSensorStatus.title.should.equal('This is the brand new sensorStatus!!!');
    });

  });

  describe('GET /api/sensorStatuses/:id', function() {
    var sensorStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensorStatuses/' + newSensorStatus._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      sensorStatus = {};
    });

    it('should respond with the requested sensorStatus', function() {
      sensorStatus.level.should.equal('New SensorStatus');
      sensorStatus.title.should.equal('This is the brand new sensorStatus!!!');
    });

  });

  describe('PUT /api/sensorStatuses/:id', function() {
    var updatedSensorStatus;

    beforeEach(function(done) {
      request(app)
        .put('/api/sensorStatuses/' + newSensorStatus._id)
        .send({
          level: 'Updated SensorStatus',
          title: 'This is the updated sensorStatus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSensorStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSensorStatus = {};
    });

    it('should respond with the updated sensorStatus', function() {
      updatedSensorStatus.level.should.equal('Updated SensorStatus');
      updatedSensorStatus.title.should.equal('This is the updated sensorStatus!!!');
    });

  });

  describe('DELETE /api/sensorStatuses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sensorStatuses/' + newSensorStatus._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sensorStatus does not exist', function(done) {
      request(app)
        .delete('/api/sensorStatuses/' + newSensorStatus._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
