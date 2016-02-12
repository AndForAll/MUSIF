var angular = angular || {};

angular.module('app.scSearch.factory', [])
  //scSearch searches soundclouds api under tracks for the input query
  //returns array of tracks w/ info
  .factory('scSearch', function($http){
    return{
      getSongs: function(query){
      return $http({
              method: 'GET',
              url: 'http://api.soundcloud.com/tracks/',
              params: {
                client_id: 'c6c9a1c45f2c0486826f0e2fdc83c2d1',
                q: query
              }
        //promise - so when it retrieves the info then send it to controller. $http has it's own promise stuff built in
      }).then(function(response){
        //what is returned.. already breaking it up for ease!
        //response is the whole obj with headers and all

        //we cannot analysize songs that are marked false for streamable
        // so let's find them!!!
        //**************** NOW THAT WE ARE GOING TO TRY REMIX.JS
        ////////////////// MAY NOT NEED TO BE STREAMABLE?
        var streamable_tracks = [];

        for(var i = 0; i < response.data.length; i++){
          if(response.data[i].streamable == true){
            //add the streamable track to the array
            streamable_tracks.push(response.data[i]);
          }
        }

        return{
          tracks: response.data,
          useable_tracks: streamable_tracks
        };
      });
    }// End of getSongs
  }
  });//End of scSearch
