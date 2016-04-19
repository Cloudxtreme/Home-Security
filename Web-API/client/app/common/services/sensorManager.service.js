'use strict';

angular.module('webApiApp')
  .service('sensorManager', sensorManager);

function sensorManager($q, $http, $state, socket, loginManager) {
	/*jshint validthis: true */
	var service = this;


	/** Service Variables **/

	/** Service Functions **/
  service.getAllAndSync = _getAllAndSync;

	/****** Implementation ******/

  function _getAllAndSync(obj) {
    $http({
        url: '/api/sensorStatuses',
          method: 'GET',
          headers: {'X-Auth': loginManager.getToken()}
       })
       .then(response => {
        obj.sensors = response.data;
        socket.syncUpdates('sensorStatuses', obj.sensors);
      });
  }

}
