'use strict';

angular.module('webApiApp')
  .controller('UserCtrl', userCtrl);

function userCtrl($scope, $rootScope, $http, $state, socket, userLogManager) {
  /*jshint validthis: true */
  var viewModel = this;


  /** Controller Variables **/
  viewModel.userLogs = [];

  /** Controller Functions **/


  _initController();


  /******** Implementation *******/

  function _initController() {
    console.log('hear');
    userLogManager.getAllAndSync(viewModel);

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('userLog');
    });
  }

}
