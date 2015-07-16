/*
MUSIF


*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);

//currently the amazon web server that we are going to use re-routes port 3000 to port 80 / https
var port = 3000;


//point express server to our client side



server.listen(port, function() {
    console.log('Server running at port:' + port);
});


//serve static content of libs and media so we can serve it to both the mobile app and the web app

app.use('/', express.static(__dirname + '/public'));
app.use('/media', express.static(__dirname+'/public/media'))
