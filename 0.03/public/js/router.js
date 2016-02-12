var angular = angular || {};

angular.module('app.router', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('Search', {
      url: '/',
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl'
    })

    $urlRouterProvider.otherwise('/'); // point the deafault to the home

  })
