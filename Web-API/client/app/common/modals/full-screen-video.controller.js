'use strict';

angular.module('webApiApp')
  .controller('FullScreenCtrl', fullScreenCtrl);

function fullScreenCtrl($modalInstance, loginManager) {
  var viewModel = this; // jshint ignore:line

  /** Modal Variables **/
  viewModel.token = null;

  /** Modal Functions **/

  _initController();

  /****** Implementation ******/

  function _initController() {
    viewModel.token = loginManager.getToken();
  }
}


