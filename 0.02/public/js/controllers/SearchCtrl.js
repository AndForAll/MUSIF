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

  //When song is chosen
  $scope.chooseSong = function(songindex){
      console.log("chosen this song:");
      console.log(songindex);
      console.log($scope.songResults[songindex]);

      scSearch.sendAnalysis($scope.songResults[songindex])

      .then(function(response){
        console.log("response from factory");
        console.log(response);
        //then we want to call the factory func that calls for the analysis results as they
        // take a while to process
          scSearch.getAnalysis().then(function(res){
            console.log('THIS IS THE RES FROM SEARCH CTRL');
            console.log('IF ALL GOES WELL SHOULD BE ANALYSIS RESULTS');
            console.log(res);
          })
      });

    // //just doing this here for now but should probs be a service
    // $http({
    //         method: 'POST',
    //         url: '/track-analysis',
    //         data: {
    //           track: $scope.songResults[songindex].stream_url
    //         }
    //   //promise - so when it retrieves the info then send it to controller. $http has it's own promise stuff built in
    // }).then(function(response){
    //
    //       console.log('HERE IS THE RESPONSE FROM THE SERVER');
    //       console.log(response);
    //
    //       //if we get a success msg
    //       if(response.data.success !=0){
    //             console.log(response.data.success);
    //             // $scopecheckAnalysis();
    //             //then call a function that keeps calling a HTTP get
    //             //checking to see if we have our URL yet
    //             //probably a factory
    //       }else{
    //             console.log(response.data);
    //             //ERROR MESSAGE SHOULD COME UP
    //       }
    // });
  };

// eventually both this and the HTTP method in get song will be in a factory / service
// just checking functionality
//   $scope.checkAnalysis = function(){
//     $http({
//             method: 'GET',
//             url: '/track-analysis',
//             data: {
//               msg: "IS THE SONG READY??!"
//             }
//       //promise - so when it retrieves the info then send it to controller. $http has it's own promise stuff built in
//     }).then(function(response){
//             console.log(response);
//       });
//     };
//

})
