import app from '../app';
import { getAlbum } from '../services/spotifyService';

app.get('/spotify/album', async (_, res) => {
  const album = await getAlbum();
  console.log(album);

  res.send('Spotify album endpoint');
});
