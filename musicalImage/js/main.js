
//say holla so we know shit is working
alert('Holla this is JS bitch titties');

console.log('lets jam');


var vid = document.getElementById('v0');
vid.pause();


var context = new AudioContext();


var audioElement = document.getElementById("player");


var analyser = context.createAnalyser();

var source = context.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(context.destination);

console.log('connected course');

var frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);


function update() {
    // Schedule the next update
    requestAnimationFrame(update);

    // Get the new frequency data
    analyser.getByteFrequencyData(frequencyData);

    console.log(frequencyData[3]); // 2048 by default
 // will give us 1024 data points
vid.currentTime = frequencyData[3]/300;

    // Update the visualisation
    // bars.each(function (index, bar) {
    //     bar.style.height = frequencyData[index] + 'px';
    // });
};





update();

