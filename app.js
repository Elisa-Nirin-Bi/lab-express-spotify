require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');


const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));


  app.get('/', (req, res) =>{
    res.render('home');
  });
  
  
  app.get('/artist-search', (req, res) =>{
    const {artist} = req.query;
  spotifyApi
  .searchArtists(artist)
  .then(data => {
   res.render('artist-search-results', {
     artists : data.body.artists.items
     
   });
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
  })

  
  
  app.get('/albums/:artistId', (req, res) => {
    const id = req.params.artistId;
    console.log(id)
    
    spotifyApi
    .getArtistAlbums(id)
    .then(data => {

        const albums = data.body.items;
        res.render('albums', {
          albums: albums
      });
   
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
    })
    
    app.get('/tracks/:trackId', (req, res) => {
      const id = req.params.trackId;
    spotifyApi
    .getAlbumTracks(id)
    .then(data => {
      const tracks = data.body.items;
      console.log(tracks)
      res.render('tracks', {
        tracks: tracks
    });
   
})
.catch(err => console.log('The error while searching artists occurred: ', err));
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
