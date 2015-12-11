var angular = angular || {};

angular.module('app.scResults.directive', [])
  .directive('scResults', function(){
    return {
      replace: true,
      restrict: 'E',
      controller: 'SearchCtrl',
      templateUrl: 'views/track-result-template.html'
    }
  })
