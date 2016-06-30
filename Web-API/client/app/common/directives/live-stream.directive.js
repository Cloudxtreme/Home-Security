angular.module('webApiApp')
  .controller('LiveStreamCtrl', liveStreamCtrl)
  .directive('liveStream', liveStreamDirective);


function liveStreamCtrl($scope) {
  var viewModel = this; // jshint ignore:line

  /** Directive Variables **/
  viewModel.token = $scope.token;

  /** Directive Functions **/

  _initController();

    /****** Implementation ******/
  function _initController() {
    var client = new WebSocket( 'ws://0.tcp.ngrok.io:14066/' + viewModel.token);
    var canvas = document.getElementById('videoCanvas');
    var player = new jsmpeg(client, {canvas:canvas});

  }
}

function liveStreamDirective() {
  return {
    restrict: 'E',
    scope: {
      token: '=token'
    },
    templateUrl: 'app/common/partials/live-stream.partial.html',
    controller: 'LiveStreamCtrl',
    controllerAs: 'liveStreamVM'
  };
}
