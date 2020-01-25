const keys = require("../../keys");

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify)


function spotifySearch(param){
  
  if (param){
    search = param
  };
  spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };
  let songArtist = "Artist: " + data.tracks.items[0].album.artists[0].name;
  let songName = "Song Name: " + data.tracks.items[0].name;
  let songLink = "Song Preview: " + data.tracks.items[0].external_urls.spotify;
  let songAlbum = "Album: " + data.tracks.items[0].album.name;
  let logString = "\n " + songArtist + '\n' + songName + '\n' + songLink + '\n' + songAlbum + '\n'
  console.log(songArtist);
  console.log(songName);
  console.log(songLink);
  console.log(songAlbum);
  
  });
};
let search = "Blink 182"

spotifySearch(search)

module.exports = spotifySearch;