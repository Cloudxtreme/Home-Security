'use strict';

angular.module('webApiApp')
  .controller('NotificationsCtrl', notificationsCtrl);

function notificationsCtrl($scope, $rootScope, $http, $state, socket, notificationsManager) {
  /*jshint validthis: true */
  var viewModel = this;


  /** Controller Variables **/
  viewModel.notifications = null;
  viewModel.notificationStatus = '';
  viewModel.notificationBody = '';

  /** Controller Functions **/
  viewModel.addNotification = _addNotification;
  viewModel.deleteNotification = _deleteNotification;


  _initController();


  /******** Implementation *******/

  function _initController() {
    $http.get('/api/sensorNotifications').then(response => {
      viewModel.notifications = response.data;
      socket.syncUpdates('sensorNotification', viewModel.notifications);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('sensorNotification');
    });
  }

  function _addNotification() {
    if (viewModel.notificationBody) {
      notificationsManager.createNotification(viewModel.notificationStatus, viewModel.notificationBody);
      viewModel.notificationStatus = '';
      viewModel.notificationBody = '';
    }
  }

  function _deleteNotification(notification) {
    viewModel.$http.delete('/api/sensorNotifications/' + notification._id);
  }
}
