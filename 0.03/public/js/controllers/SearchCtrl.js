var angular = angular || {};

angular.module('app.controller.search', [])
.controller('SearchCtrl', function($scope, $rootScope, scSearch, $http) {
  console.log('CONTROLLER');

  $scope.songResults;

  //if search button pressed
  $scope.searchSC = function(query){
    scSearch.getSongs(query)
    //as it's a promise we need the .then callback so once
    //it retrieves the info then it updates
    .then(function(response){
        $scope.songResults = response.useable_tracks;
        console.log("RESPONSE USABLE");
        console.log(response.useable_tracks);
        console.log("RESPONSE ALL");
        console.log(response.tracks);
    });
  };

  // When song is chosen
  // TO DO:
  // GET THE SONG URL OR WHAT EVS IS NEEDED FOR ECHONEST REMIX.JS
  // PASS IT THROUGH & GET TRACK ANALYSIS THIS WAY..
  // we almost want it so we choose the song & it loads a player template
  // and behind the scenes it uses that remix.js lib and loads the song in with the
  // analysis with the new page
  $scope.chooseSong = function(songindex){
      console.log("chosen this song:");
      console.log(songindex);
      console.log($scope.songResults[songindex]);
      
  }; //CHOOSE SONG FUNCTION
}) // SEARCH CONTROLLER
