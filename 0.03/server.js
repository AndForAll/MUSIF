/*
MUSIF v.0.03

Application that allows client to search for a song via the SoundCloud API

Then I am going to test linking that up to Echonest's Remix.js library for song analysis

Which will be used to manipulate visuals in time with the specified SoundCloud track
*/

/*----------- S E T  U P  S T U F F -----------*/

var request = require('request');       //to send/recieve RESTful
//var SC = require('node-soundcloud');    //Module that wraps SoundCloud API
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

/*----------- M Y  V A R I A B L E S -----------*/




/*----------- S O U N D C L O U D  S T U F F -----------*/

//Initialize SoundCloud Api keys
//URI is the redirect we use when we are doing 0Auth...
//atm as we are accessing unprotected endpoionts aka. public songs
// we don't require a user to log in...
// SC.init({
//   id: 'c6c9a1c45f2c0486826f0e2fdc83c2d1',
//   secret:'e252aa5fca47ba09effbf23c0762cd04',
//   uri:' '
// });
