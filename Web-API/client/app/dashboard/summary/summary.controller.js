'use strict';

angular.module('webApiApp')
  .controller('SummaryCtrl', summaryCtrl);

function summaryCtrl($scope, $rootScope, $http, $state, socket, sensorManager) {
  /*jshint validthis: true */
  var viewModel = this;


  /** Controller Variables **/
  viewModel.sensors = [];

  /** Controller Functions **/
  viewModel.getSensorByID = _getSensorByID;

  _initController();


  /******** Implementation *******/

  function _initController() {
    sensorManager.getAllAndSync(viewModel);

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('sensorNotification');
    });
  }

  function _getSensorByID(id) {
    console.log(_.find(viewModel.sensors, { 'id': id}));
    console.log(viewModel.sensors);
    console.log(id);
    return _.find(viewModel.sensors, { 'id': id});
  }


}
