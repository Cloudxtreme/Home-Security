'use strict';

angular.module('webApiApp')
  .controller('SensorNotificationModalCtrl', sensorNotificationModalCtrl);

function sensorNotificationModalCtrl($modalInstance, notificationObj, notificationsManager) {
  /*jshint validthis: true */
  var viewModel = this;


  /** Modal Variables **/
  viewModel.notification = notificationObj;

  /** Modal Functions **/
  viewModel.markResolved = _markResolved;
  viewModel.dismiss = _dismiss;
  viewModel.deleteNotification = _deleteNotification;
  viewModel.isUnresolved = _isUnresolved;


  _initController();


  /******** Implementation *******/

  function _initController() {

  }

  function _markResolved() {
    viewModel.notification.status = 'Resolved';
    notificationsManager.markResolved(viewModel.notification);
  }

  function _isUnresolved() {
    return viewModel.notification.status.toLowerCase() != 'resolved'
  }

  function _deleteNotification() {
    notificationsManager.delete(viewModel.notification);
    _dismiss();
  }

  function _dismiss() {
    $modalInstance.dismiss("Delete");
  }

}
