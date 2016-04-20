'use strict';

angular.module('webApiApp')
  .service('notificationsManager', notificationsManager);

function notificationsManager($q, $http, $state, socket, loginManager) {
	/*jshint validthis: true */
	var service = this;


	/** Service Variables **/

	/** Service Functions **/
	service.createNotification = _createNotification;
  service.getAllAndSync = _getAllAndSync;
  service.markResolved = _markResolved;
  service.delete = _delete;

	/****** Implementation ******/

	function _createNotification(level, title, description, status) {
	  var deferred = $q.defer();

      $http({
      		url: '/api/sensorNotifications',
            method: 'POST',
            data: {
              level: level,
              title: title,
              description: description,
              status: status,
            },
            headers: {'X-Auth': loginManager.getToken()}
         })
		.success(function() {
			deferred.resolve();
		})
		.error(function(data, status) {
			deferred.reject(status);
		});

		return deferred.promise;
	}

  function _getAllAndSync(obj) {
    $http({
        url: '/api/sensorNotifications',
          method: 'GET',
          headers: {'X-Auth': loginManager.getToken()}
       })
       .then(response => {
        obj.notifications = response.data;
        socket.syncUpdates('sensorNotification', obj.notifications);
      });
  }

  function _markResolved(obj) {
    $http({
        url: '/api/sensorNotifications/' + obj._id,
          method: 'PATCH',
          data: {
            status: 'Resolved'
          },
          headers: {'X-Auth': loginManager.getToken()}
    });
  }

  function _delete(obj) {
    $http({
        url: '/api/sensorNotifications/' + obj._id,
          method: 'DELETE',
          headers: {'X-Auth': loginManager.getToken()}
    });
  }

}
