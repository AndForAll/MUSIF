/*
MUSIF v.0.02

Application that allows client to search for a song via the SoundCloud API
Then sends song data to server which sends a streamable song to EchoNest API
To get track analysis information

Which will be used to manipulate visuals in time with the specified SoundCloud track
*/

/*----------- S E T  U P  S T U F F -----------*/

var request = require('request');       //to send/recieve RESTful
var Echonest = require('echonestjs');   //Module that wraps Echonest API
var SC = require('node-soundcloud');    //Module that wraps SoundCloud API
var fs = require('fs');                 //So we can read/write files... currently how saving JSON track analysis

var express = require('express');       //create express server
var app = express();
var bodyParser = require('body-parser');//So we can Parse HTTP / RESTFUL in JSON
var server = require('http').Server(app);//Create Server

//serve static content of media
//point express server to our client side
app.use('/', express.static(__dirname + '/public'));
app.use('/media', express.static(__dirname+'/public/media'));

app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('incoming request from ---> ' + ip);
    // Show the target URL that the user just hit
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);
    next();
});

//currently the amazon web server that we are going to use re-routes port 3000 to port 80 / https
var port = 3000;

server.listen(port, function() {
    console.log('Server running at port:' + port);
});


/*----------- S O U N D C L O U D  S T U F F -----------*/

//Initialize SoundCloud Api keys
//URI is the redirect we use when we are doing 0Auth...
//atm as we are accessing unprotected endpoionts aka. public songs
// we don't require a user to log in...
SC.init({
  id: 'c6c9a1c45f2c0486826f0e2fdc83c2d1',
  secret:'e252aa5fca47ba09effbf23c0762cd04',
  uri:' '
});


/*----------- E C H O N E S T  S T U F F -----------*/

//Initialize Echonest API key
Echonest.init('H4RHH3GOJ1P4FJHXK');


//Recieves req from client - The track they want to analyise
//Sends that track to echonest for analysis
app.post('/track-analysis', function(req, res) {
    // console.log('THIS IS THE REQ');
    // console.log(req);
    console.log('THIS IS THE REQ BODY');
    console.log(req.body);

    // POST track to echonest
    var options = {
        url: 'http://developer.echonest.com/api/v4/track/upload?api_key=H4RHH3GOJ1P4FJHXK',
        method: 'POST',
        headers:{
          'content-type' : 'application/x-www-form-urlencoded'
        },
        'body': 'wait=false&url='+req.body.track+'?consumer_key=c6c9a1c45f2c0486826f0e2fdc83c2d1'
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('-----------------------SUCCESS');
            console.log(body);
            body = JSON.parse(body);
            console.log(body.response.track);
            console.log(body.response.track.status);
            console.log(body.response.track.id);

            // Now let's send the news to the client!
            //This won't have track analysis url
            //just tells client that successfully submitted to analysis
            // when recieve this on client end should have some sort of loader
            //etc... and keep asking us if we have the url yet
            res.json({
              success: 'Song sent for analysis',
              data: body
            });

            checkAnalysis(body.response.track.id);

        }else{
            console.log(error);
            console.log('-----------------------FAILED');
            console.log(response);
            res.json({
              error: error,
              data: response
            });
        }
    }

    request(options, callback);
});

function checkAnalysis(track_id){
  //So we need to see if analysis is finished

  var checkAnalysisTimer = setInterval( function () {

  	console.log("Looking for status");

    Echonest.get('track/profile', { id: track_id, bucket: "audio_summary" }, function (err, res) {

      if (err) {
        console.log("there was an error");
        console.log(err);
        console.log("exited function");
        clearInterval(checkAnalysisTimer);
      } else {

        console.log('---------------------------------------------');
        console.log(res.response.track.status);
        console.log('---------------------------------------------');

          if(res.response.track.status != 'pending'){
            console.log('ITS FINISHED!!!!!!');
            console.log('---------------------------------------------');
            console.log(res.response.track.audio_summary.analysis_url);
            console.log('---------------------------------------------');
            //ASSIGN THE URL TO A VAR SO WE CAN GET ANALYSIS INFO
            var anal_url = res.response.track.audio_summary.analysis_url;

            //CLEAR THE TIMER BECAUSE WE ARE DONE!!!!
            clearInterval(checkAnalysisTimer);

          }else{
            console.log('STILL NOT FINISHED');
          }
      }
    }); //END OF ECHONEST GET REQ
  },4000); //END OF checkAnalysisTimer

} // END OF CHECK ANALYSIS FUNCTION

// //SEND TO CLIENT
// app.get('/track-analysis', function(req, res) {
//     console.log('THIS IS THE REQ BODY');
//     console.log(req.body);
//
//       if(){
//
//       }
//
//       res.json({
//         success: 'Song sent for analysis',
//         data: anal_url
//       });
// })
