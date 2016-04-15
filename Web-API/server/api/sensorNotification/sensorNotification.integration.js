'use strict';

var app = require('../..');
import request from 'supertest';

var newSensorNotification;

describe('SensorNotification API:', function() {

  describe('GET /api/sensorNotifications', function() {
    var sensorNotifications;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensorNotifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorNotifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sensorNotifications.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sensorNotifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sensorNotifications')
        .send({
          level: 'New SensorNotification',
          title: 'This is the brand new sensorNotification!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSensorNotification = res.body;
          done();
        });
    });

    it('should respond with the newly created sensorNotification', function() {
      newSensorNotification.level.should.equal('New SensorNotification');
      newSensorNotification.title.should.equal('This is the brand new sensorNotification!!!');
    });

  });

  describe('GET /api/sensorNotifications/:id', function() {
    var sensorNotification;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensorNotifications/' + newSensorNotification._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensorNotification = res.body;
          done();
        });
    });

    afterEach(function() {
      sensorNotification = {};
    });

    it('should respond with the requested sensorNotification', function() {
      sensorNotification.level.should.equal('New SensorNotification');
      sensorNotification.title.should.equal('This is the brand new sensorNotification!!!');
    });

  });

  describe('PUT /api/sensorNotifications/:id', function() {
    var updatedSensorNotification;

    beforeEach(function(done) {
      request(app)
        .put('/api/sensorNotifications/' + newSensorNotification._id)
        .send({
          level: 'Updated SensorNotification',
          title: 'This is the updated sensorNotification!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSensorNotification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSensorNotification = {};
    });

    it('should respond with the updated sensorNotification', function() {
      updatedSensorNotification.level.should.equal('Updated SensorNotification');
      updatedSensorNotification.title.should.equal('This is the updated sensorNotification!!!');
    });

  });

  describe('DELETE /api/sensorNotifications/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sensorNotifications/' + newSensorNotification._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sensorNotification does not exist', function(done) {
      request(app)
        .delete('/api/sensorNotifications/' + newSensorNotification._id)
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
