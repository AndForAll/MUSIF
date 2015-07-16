var angular = angular || {};

//eventually a service will be better for this as it is almost class based
//there fore when we pull from where ever we have imgs and data saved
//some stuff can be standardized...

angular.module('app.factory.audio', [])
.factory('AUDIOFACTORY', function() {
  //regular functions
  ////////
  function init() {
    var context = new AudioContext();
    var audioElement = document.getElementById('player');
    var analyser = context.createAnalyser();
    analyser.fftS = 512;

    var source = context.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(context.destination);

    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);

    var AudioObjects = {
      context: context,
      audioElement: audioElement,
      analyser: analyser,
      source: source,
      frequencyData: frequencyData
    };
    return AudioObjects

  }

  //returning functions
  ////////
  return {
    start: function(){
      console.log('YOYO');
      console.log('INITED');

      return init();
    },
    getFrequency: function(analyser, frequencyData){
      // Schedule the next update
      // requestAnimationFrame(update);

      // Get the new frequency data
      analyser.getByteFrequencyData(frequencyData);

      // console.log(frequencyData[3]); // 2048 by default
      return frequencyData[3];

    }//end of update

  }; // end of return


});
