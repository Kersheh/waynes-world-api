import app from '../app';
import SpotifyApi, { safeSpotifyRequest } from '../modules/spotify';

app.get('/spotify/search', async (req, res) => {
  const { q } = req.query;

  try {
    const results = await safeSpotifyRequest(
      () => SpotifyApi.search(q as string, ['artist', 'album'])
    );
    res.send(results);
  } catch(err) {
    console.error('Failed to fetch spotify artist/albums search results:', err);
    res.status(500).send();
  }
});

app.get('/spotify/albums', async (req, res) => {
  const { artist } = req.query;

  try {
    const results = await safeSpotifyRequest(
      () => SpotifyApi.getArtistAlbums(artist as string, { limit: 10 })
    );
    res.send(results);
  } catch(err) {
    console.error(`Failed to fetch ablums by artist ${artist} search results:`, err);
    res.status(500).send();
  }
});
