var angular = angular || {};

// Home GALLERY Controller

angular.module('app.controller.play', [])
.controller('PlayCtrl', function ($scope, $rootScope, AUDIOFACTORY, delay) {

  console.log(delay);
  console.log('PLAY CONTROLLER');

  $scope.AudioContext;
  $scope.frame = 0;
  $scope.currentGif = $rootScope.global.gifLib[0];

  // $scope.Currentframe = $scope.currentGif.frames.paths[$scope.frame];
  $scope.Currentframe = 'http://localhost:3000/media/subway/image_000102.jpg';
  console.log($scope.Currentframe);

  $scope.initAudio = function() {
    console.log('CLICK');

    $scope.AudioContent = AUDIOFACTORY.start();
    console.log($scope.AudioContent);
  };

  $scope.initAudio();


  function update() {
    // Schedule the next update
    requestAnimationFrame(update);
    $scope.val = AUDIOFACTORY.getFrequency($scope.AudioContent.analyser,$scope.AudioContent.frequencyData);
    // console.log('UPDATE AUDIO');
    // console.log($scope.val);
    // console.log($scope.val.map(0,$rootScope.global.gifLib[0].length, 0, 512));
    // console.log(($scope.val-0)*($rootScope.global.gifLib[0].length-0)/(300-0)+0);

    $scope.frameRate = ($scope.val-0)*($rootScope.global.gifLib[0].length-0)/(250-0)+0;
    // console.log($scope.frameRate);
    $scope.frame = Math.round($scope.frameRate);
    // console.log($scope.frame);
    console.log($scope.frame);

    $scope.$apply(function(){

      $scope.Currentframe = $scope.currentGif.frames.paths[$scope.frame];
      console.log($scope.Currentframe);

    });


  }

  update();

});
