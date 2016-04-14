'use strict';

angular.module('webApiApp')
  .controller('DashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $rootScope, $http, $state, socket, notificationsManager, loginManager) {
  loginManager.redirectIfNotLoggedIn();

  /*jshint validthis: true */
  var viewModel = this;


  /** Controller Variables **/


  /** Controller Functions **/


  _initController();


  /******** Implementation *******/

  function _initController() {

  }
}
