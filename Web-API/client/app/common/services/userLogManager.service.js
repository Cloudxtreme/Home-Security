'use strict';

angular.module('webApiApp')
  .service('userLogManager', userLogManager);

function userLogManager($q, $http, $state, socket, loginManager) {
	/*jshint validthis: true */
	var service = this;


	/** Service Variables **/


	/** Service Functions **/
  service.getAllAndSync = _getAllAndSync;

	/****** Implementation ******/

  function _getAllAndSync(obj) {
    $http({
        url: '/api/userLogs',
          method: 'GET',
          headers: {'X-Auth': loginManager.getToken()}
       })
       .then(response => {
        obj.userLogs = response.data;
        socket.syncUpdates('userLog', obj.userLogs);
      });
  }

}
