'use strict';

angular.module('webApiApp')
  .controller('NotificationsCtrl', notificationsCtrl);

function notificationsCtrl($scope, $rootScope, $http, $state, $sce, socket, notificationsManager) {
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


  viewModel.config = {
				sources: [
					{src: $sce.trustAsResourceUrl("assets/videos/After.mp4"), type: "video/mp4"}
				],
				tracks: [
					{
						src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
						kind: "subtitles",
						srclang: "en",
						label: "English",
						default: ""
					}
				],
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					poster: "assets/images/After.png"
				}
			};




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
