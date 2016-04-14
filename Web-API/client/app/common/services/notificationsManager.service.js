'use strict';

angular.module('webApiApp')
  .service('notificationsManager', notificationsManager);

function notificationsManager($q, $http, $state, loginManager) {
	/*jshint validthis: true */
	var service = this;


	/** Service Variables **/

	/** Service Functions **/
	service.createNotification = _createNotification;
  service.getAllAndSync = _getAllAndSync;

	/****** Implementation ******/

	function _createNotification(status, body) {
	  var deferred = $q.defer();

      $http({
      		url: '/api/sensorNotifications',
            method: 'POST',
            data: {status: status, message: body },
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

}
