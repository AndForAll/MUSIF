var angular = angular || {};

angular.module('app.router', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
		  templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })

    .state('play', {
      abstract: true,
      url:'/HDplay',
      templateUrl: 'views/play.html',
      resolve: {

        delay: function($q, $timeout){
          console.log('indelay');
          var deferred = $q.defer();
          console.log(deferred);
          $timeout(function(){

            console.log('in timeout');
            deferred.resolve('HELLO');

          },100);

          return deferred.promise;
        }
      },
      controller: 'PlayCtrl'
    })

    .state('play.HD', {
      url: '',
      views: {
        '': {
          templateUrl: 'views/play.hdgif.html'
        },
        'play-bottom-container': {
          templateUrl: 'views/play.audio.html',
          // resolve: {
          //
          //   delay: function($q, $timeout){
          //     console.log('indelay');
          //     var deferred = $q.defer();
          //     console.log(deferred);
          //     $timeout(function(){
          //
          //       console.log('in timeout');
          //       deferred.resolve('HELLO');
          //
          //     },100);
          //
          //     return deferred.promise;
          //   }
          // },
          controller: function($rootScope,$scope){
            // console.log(delay);
          }
        }
      } // end of views
    })

  $urlRouterProvider.otherwise('/'); // point the deafault to the home

})
