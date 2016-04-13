'use strict';

angular.module('webApiApp')
  .controller('HomeCtrl', homeCtrl);

function homeCtrl($scope, $rootScope, $http, $state, loginManager) {
  /*jshint validthis: true */
  var viewModel = this;


  /** Controller Variables **/
  viewModel.username = '';
  viewModel.password = '';
  viewModel.loginError = false;

  /** Controller Functions **/
  viewModel.login = _login;


  /****** Implementation ******/

  function _login() {

    function _loginSuccess() {
      viewModel.loginError = false;
      $rootScope.$emit('login');
      $state.go('posts');
    }

    function _loginFailure() {
      viewModel.loginError = true;
    }

    loginManager.login(viewModel.username, viewModel.password).then(_loginSuccess, _loginFailure);
  }

}
