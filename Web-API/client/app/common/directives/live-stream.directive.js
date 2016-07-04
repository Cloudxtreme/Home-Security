angular.module('webApiApp')
  .controller('LiveStreamCtrl', liveStreamCtrl)
  .directive('liveStream', liveStreamDirective);


function liveStreamCtrl($scope, $timeout, streamUrlManager) {
  var viewModel = this; // jshint ignore:line

  /** Directive Variables **/
  viewModel.token = $scope.token;
  viewModel.name = $scope.name;

  /** Directive Functions **/

  $timeout(_initController, 0);

    /****** Implementation ******/
  function _initController() {

    function _initPlayer(url) {
      console.log(url); 
      var client = new WebSocket( 'ws://' + url +  '/' + viewModel.token);
      var canvas = document.getElementById('videoCanvas' + viewModel.name);
      var player = new jsmpeg(client, {canvas:canvas});
    }

    function _showError() {
      alert('Stream Server Could Not Be Found');
    }
    
    streamUrlManager.getUrl().then(_initPlayer, _showError);
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
