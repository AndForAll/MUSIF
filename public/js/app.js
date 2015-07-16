var angular = angular || {};

// Our main JavaScript file
// Init Angular world by linking to 'myApp' namespace we declared in <body>
// in [ ], we add any dependencies used for the project
// `ui.router` is reserved by ui.router library

angular.module('myApp', ['ui.router',
//MAIN JS FILES
'app.router',

//CONTROLLERS
'app.controller.home',
'app.controller.play',

//SERVICES
'app.factory.hdgif',
'app.factory.audio'
//EXTRA
])

.run(function($rootScope, HDGIFFACTORY) {
    console.log('WE RUN RUN RUN');

    //create a global object so we can fake a data base
    //this can be accessed anywhere in the app
    $rootScope.global = {};

    //declare our library of gifs
    $rootScope.global.gifLib = [
      {
      title: 'subway',
      id: '01',
      path: 'http://localhost:3000/media/subway/image_000',
      frames: [],
      tags: ['test', 'first try'],
      length: 51,
      pad: 6,
      start: 102
    },
    {
      title: 'untitled',
      id: '',
      path: '',
      frames: [],
      tags: [],
      length: 0
    },
    {
      title: 'untittled',
      id: '',
      path: '',
      frames: [],
      tags: [],
      length: 0
    }];



    $rootScope.global.gifLib[0].frames = HDGIFFACTORY.getPaths($rootScope.global.gifLib[0].path,$rootScope.global.gifLib[0].length,$rootScope.global.gifLib[0].padding,$rootScope.global.gifLib[0].start);
    //We will want a function to populate the amount of frames and
    //save them to the frames array with the paths


    console.log('HERE IS OUR GIF LIBRARY');
    console.log($rootScope.global.gifLib);

  })
