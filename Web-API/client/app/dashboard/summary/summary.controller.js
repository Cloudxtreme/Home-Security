'use strict';

angular.module('webApiApp')
  .controller('SummaryCtrl', summaryCtrl);

function summaryCtrl($scope, $rootScope, $http, $state, socket, sensorManager, loginManager) {
  /*jshint validthis: true */
  var viewModel = this;


  /** Controller Variables **/
  viewModel.sensors = [];
  viewModel.streamToken = null;

  /** Controller Functions **/
  viewModel.getSensorByID = _getSensorByID;

  _initController();


  /******** Implementation *******/

  function _initController() {
    viewModel.streamToken = loginManager.getToken();
    sensorManager.getAllAndSync(viewModel);

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('sensorStatuses');
    });
  }

  function _getSensorByID(id) {
    return _.find(viewModel.sensors, { 'id': id});
  }


}
