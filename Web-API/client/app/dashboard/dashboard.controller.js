'use strict';

angular.module('webApiApp')
  .controller('DashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $rootScope, $q, $modal, $state, socket, notificationsManager, loginManager, userLogManager, Modal) {
  loginManager.redirectIfNotLoggedIn();

  /*jshint validthis: true */
  var viewModel = this;

  /** Controller Variables **/
  viewModel.currentUser = 'User not logged in';
  viewModel.notifications = [];


  /** Controller Functions **/
  viewModel.openNotification = _openNotification;
  viewModel.openFullScreen = _openFullScreen;
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

  function _openNotification(notification) {
    var modalInstance = $modal.open({
      templateUrl: 'app/common/modals/sensor-notification.html',
      controller: 'SensorNotificationModalCtrl',
      controllerAs: 'sensorNotificationModalCtrl',
      resolve: {
        notificationObj: function() { return notification; }
      }
    });
    // modalInstance.result.then(function(status) {
    //   // if (status === 'Delete') {
    //   //   analysisManager.deleteAnalysis(analysisId).then(_handleSuccess,_handleFailure);
    //   // }
    // });
  }

  function _openFullScreen() {
    var modalInstance = $modal.open({
      templateUrl: 'app/common/modals/full-screen-video.html',
      size: 'lg'
    });
  }

  function _createTestNotification() {
    notificationsManager.createNotification('yellow', 'This is a test notification', 'not much goin on here', 'open');
  }

  function _goTo(goTo) {
    $state.go(goTo);
  }
}
