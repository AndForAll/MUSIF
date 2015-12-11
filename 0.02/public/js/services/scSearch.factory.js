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
    }, //end of get songs
    sendAnalysis: function(track){ // thought needed two sep func but maybe stay in this until we get a reposnse that says we have in the info
       return $http({
                method: 'POST',
                url: '/track-analysis',
                data: {
                  track: track.stream_url
                }
          //promise - so when it retrieves the info then send it to controller. $http has it's own promise stuff built in
        }).then(function(response){
            console.log('HERE IS THE RESPONSE FROM THE SERVER');
            console.log(response);

            //if we get a success msg
            if(response.data.success !=0){
                  console.log("successfully sent for analysis");
                  return response;
            }else{
                  console.log("FAILED TO SEND TO ECHONEST");
                  console.log(response.data);
                  //ERROR MESSAGE SHOULD COME UP
                  return response.data.error;
            }
        });

    }, //end of send analysis
    getAnalysis: function() {
      return $http({
                    method: 'GET',
                    url: '/track-analysis'
                    //promise - so when it retrieves the info then send it to controller. $http has it's own promise stuff built in
            }).then(function(res){
                console.log("WE FUCKING GOT SOMETHING");
                console.log(res);
                return res.data;
            });
    }//end of get analysis
    }// END OF RETURN
  })//End of scSearch
