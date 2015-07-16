var angular = angular || {};

//eventually a service will be better for this as it is almost class based
//there fore when we pull from where ever we have imgs and data saved
//some stuff can be standardized...

angular.module('app.factory.hdgif', [])
.factory('HDGIFFACTORY', function() {
  //regular functions
  ////////
  function pad(number, length){
    var str = '' + number; while (str.length < length) { str = '0' + str; } return str;
  }

  //returning functions
  ////////
  return {
    getPaths: function(path, length, padding, start){

      var end = length + start;
      var counter = 0;

      var gif = {};
      gif.paths = [];
      // gif.urls = [];

      for(var i = start; i <= end; i++){
        gif.paths[counter] = path + pad(i,padding)+ '.jpg';
        counter++;
      }

      console.log(gif);
      return gif;

    } // end of getPaths

  } // end of return


});
