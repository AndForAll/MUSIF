var request = require('request');
var Echonest = require('echonestjs');


Echonest.init('H4RHH3GOJ1P4FJHXK');


//TRYING WITH SPOTIFY ID
//http://developer.echonest.com/api/v4/artist/biographies?api_key=FILDTEOIK2HBORODV&id=spotify:artist:4Z8W4fKeB5YxbusRsdQVPb
// Echonest.get('artist/biographies', { id: "spotify:artist:4Z8W4fKeB5YxbusRsdQVPb" }, function (err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
// });


//WORKS BUT THIS SONG HAS NO SUMMARY!!!!
Echonest.get('track/profile', { id: "SODBJKU1460DEB42E8", bucket: "audio_summary" }, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log(res.response.track.audio_summary);
    }
});

//WORKS!!!!!!!
// Echonest.get('song/search', { artist:"britney spears" ,title: "baby one more time" }, function (err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//       console.log(res.response.songs);
//       console.log(res.response.songs[0]);
//     }
// });



//WORKS!!!!!!!
// Echonest.get('song/search', { artist: "led zeppelin" }, function (err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
// });
