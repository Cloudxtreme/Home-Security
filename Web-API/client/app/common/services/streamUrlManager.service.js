'use strict';

angular.module('webApiApp')
  .service('streamUrlManager', streamUrlManager);

function streamUrlManager($q, $http, $state, loginManager) {
  /*jshint validthis: true */
	var service = this;

	/** Service Variables **/

	/** Service Functions **/
  service.getUrl = _getUrl;

	/****** Implementation ******/

  function _getUrl(obj) {
    var deferred = $q.defer();

		$http.get('api/streamUrl', {headers: {'X-Auth': loginManager.getToken()}})
			.success(function(data) {
				deferred.resolve(data.url);
			})
			.error(function(data, status) {
				deferred.reject(status);
			});

		return deferred.promise;

  }


}


