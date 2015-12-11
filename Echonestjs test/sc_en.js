//TESTING PULLING FROM SOUND CLOUD API AND Echonest
//WITH THE HOPE TO ANALYZE TRACK VIA SOUNDCLOUD URL

var request = require('request');
var Echonest = require('echonestjs');
var SC = require('node-soundcloud');
var fs = require('fs');

//Initialize Echonest API key
Echonest.init('H4RHH3GOJ1P4FJHXK');

//Initialize SoundCloud Api keys
//URI is the redirect we use when we are doing 0Auth...
//atm as we are accessing unprotected endpoionts aka. public songs
// we don't require a user to log in...
SC.init({
  id: 'c6c9a1c45f2c0486826f0e2fdc83c2d1',
  secret:'e252aa5fca47ba09effbf23c0762cd04',
  uri:' '
});

//get tracks...
//WORKS
//GOT THE ID FROM THE CODE BELOW JUST FOR NOW
// SC.get('/tracks/87143747',function(err, track) {
//   if ( err ) {
//     throw err;
//   } else {
//     // console.log('track retrieved:', track);
//     console.log('title:', track.title);
//     console.log('streamable:', track.streamable);
//     console.log('stream URL:', track.stream_url);
//   }
// });


///POST METHOD TO ECHONEST FOR ANALYSIS WORKS!!!!!
var options = {
    url: 'http://developer.echonest.com/api/v4/track/upload?api_key=H4RHH3GOJ1P4FJHXK',
    method: 'POST',
    headers:{
      'content-type' : 'application/x-www-form-urlencoded'
    },
    'body': 'wait=false&url=https://api.soundcloud.com/tracks/108726055/stream?consumer_key=c6c9a1c45f2c0486826f0e2fdc83c2d1'
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('-----------------------SUCCESS');
        console.log(body);
    }else{
        console.log(error);
        console.log('-----------------------FAILED');
        console.log(response);
    }
}

request(options, callback);

//NOW JUST WANNA SEE IF ITS FINISHING ANALYZING ON ECHONEST YET!!!!!!
// WORKS FUCK YES
// Echonest.get('track/profile', { id: "TRUQQAP13DF8BF5FD2", bucket: "audio_summary" }, function (err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res.response.track);
//       console.log(res.response.track.audio_summary);
//       console.log('---------------------------------------------');
//       console.log(res.response.track.audio_summary.analysis_url);
//       console.log('---------------------------------------------');
//       var anal_url = res.response.track.audio_summary.analysis_url;
//
//       request(anal_url, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//           console.log("WORKED... I THINK");
//           console.log(body);
//           //LETS WRITE THIS DATA TO A JSON FILE!!!!
//           var outputFilename = 'analysis_no_stringify.json';
//           //JSON.stringify(body, null, 4)
//           fs.writeFile(outputFilename, body, function(err) {
//               if(err) {
//                 console.log(err);
//               } else {
//                 console.log("JSON saved to " + outputFilename);
//               }
//           });
//
//         }else{
//           console.log("DIDN'T WORK");
//           console.log(response);
//         }
//       })
//     }
// });

// Echonest.get('track/profile', { id: "TRUQQAP13DF8BF5FD2" }, function (err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
// });

//IT WORKS AHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
// HOW TO DO SEARCHS IN SOUNDCLOUD
// SC.get('/tracks', {q: 'Pitbull Christina Aguilera Feel This Moment'} ,function(err, track) {
//   if ( err ) {
//     throw err;
//   } else {
//     console.log('track retrieved:', track);
//   }
// });

// track retrieved: [ { download_url: null,
//     key_signature: '',
//     user_favorite: false,
//     likes_count: 132944,
//     release: '',
//     attachments_uri: 'https://api.soundcloud.com/tracks/87143747/attachments',
//     waveform_url: 'https://w1.sndcdn.com/2KaMDsenaQ5F_m.png',
//     purchase_url: null,
//     video_url: null,
//     streamable: true,
//     artwork_url: 'https://i1.sndcdn.com/artworks-000045097905-0psx7f-large.jpg',
//     comment_count: 5212,
//     commentable: true,
//     description: '',
//     download_count: 0,
//     downloadable: false,
//     embeddable_by: 'all',
//     favoritings_count: 132944,
//     genre: 'Pop',
//     isrc: '',
//     label_id: null,
//     label_name: '',
//     license: 'all-rights-reserved',
//     original_content_size: 4593662,
//     original_format: 'mp3',
//     playback_count: 11975358,
//     purchase_title: null,
//     release_day: null,
//     release_month: null,
//     release_year: null,
//     reposts_count: 31224,
//     state: 'finished',
//     tag_list: 'Pitbull Christina Aguilera Feel This Moment',
//     track_type: 'original',
//     user:
//      { avatar_url: 'https://i1.sndcdn.com/avatars-000139760969-5tist1-large.jpg',
//        id: 9942298,
//        kind: 'user
//        permalink_url: 'http://soundcloud.com/pitbull',
//       uri: 'https://api.soundcloud.com/users/9942298',
//       username: 'Pitbull',
//       permalink: 'pitbull',
//       last_modified: '2015/04/06 21:47:19 +0000' },
//    bpm: null,
//    user_playback_count: null,
//    id: 87143747,
//    kind: 'track',
//    created_at: '2013/04/09 19:45:36 +0000',
//    last_modified: '2015/09/05 12:29:47 +0000',
//    permalink: 'feel-this-moment-ft-christina',
//    permalink_url: 'https://soundcloud.com/pitbull/feel-this-moment-ft-christina',
//    title: 'Feel This Moment ft. Christina Aguilera',
//    duration: 229610,
//    sharing: 'public',
//    stream_url: 'https://api.soundcloud.com/tracks/87143747/stream',
//    uri: 'https://api.soundcloud.com/tracks/87143747',
//    user_id: 9942298,
//    policy: 'ALLOW',
//    monetization_model: 'NOT_APPLICABLE' }
