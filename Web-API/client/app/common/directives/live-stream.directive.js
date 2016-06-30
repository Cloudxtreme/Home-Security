angular.module('webApiApp')
  .controller('LiveStreamCtrl', liveStreamCtrl)
  .directive('liveStream', liveStreamDirective);


function liveStreamCtrl($scope, $timeout) {
  var viewModel = this; // jshint ignore:line

  /** Directive Variables **/
  viewModel.token = $scope.token;
  viewModel.name = $scope.name;

  /** Directive Functions **/

  $timeout(_initController, 0);

    /****** Implementation ******/
  function _initController() {
    angular.element(document).ready(function () {
      var client = new WebSocket( 'ws://0.tcp.ngrok.io:14066/' + viewModel.token);
      var canvas = document.getElementById('videoCanvas' + viewModel.name);
      var player = new jsmpeg(client, {canvas:canvas});
    });
  }
}

function liveStreamDirective() {
  return {
    restrict: 'E',
    scope: {
      token: '=token',
      name: '=name'
    },
    templateUrl: 'app/common/partials/live-stream.partial.html',
    controller: 'LiveStreamCtrl',
    controllerAs: 'liveStreamCtrl'
  };
}
