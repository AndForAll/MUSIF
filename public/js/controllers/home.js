var angular = angular || {};

// Home Controller

angular.module('app.controller.home', [])
.controller('HomeCtrl', function ($scope, $rootScope, $state) {

  console.log('IN HOME');

  //function for strat click
  //doesn't technically need to be done this way
  // $scope.startPlay = function() {
  //   console.log('CLICK CLICK BITCHES');
  //
  //   $state.go('play.HD');
  // }

});
