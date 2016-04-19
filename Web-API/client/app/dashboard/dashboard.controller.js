'use strict';

angular.module('webApiApp')
  .controller('DashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $rootScope, $http, $state, socket, notificationsManager, loginManager, userLogManager) {
  loginManager.redirectIfNotLoggedIn();

  /*jshint validthis: true */
  var viewModel = this;

  /** Controller Variables **/
  viewModel.currentUser = 'User not logged in';
  viewModel.notifications = [];


  /** Controller Functions **/
  viewModel.createTestNotification = _createTestNotification;
  viewModel.goTo = _goTo;

  _initController();


  /******** Implementation *******/

  function _initController() {
    loginManager.getUser().then(function(username) {
      viewModel.currentUser = username.fullname;
    });

    notificationsManager.getAllAndSync(viewModel);

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('sensorNotification');
    });

  }

  function _createTestNotification() {
    notificationsManager.createNotification('yellow', 'This is a test notification', 'not much goin on here', 'open');
  }

  function _goTo(goTo) {
    $state.go(goTo);
  }
}
