import app from '../app';
import { getArtistAlbums } from '../services/spotifyService';

app.get('/spotify/search', async (_, res) => {
  const results = await getArtistAlbums();
  console.log(results);

  res.send('Spotify search endpoint');
});
