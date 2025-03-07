import app from 'app';
import SpotifyApi, { safeSpotifyRequest } from 'modules/spotify';

app.get('/spotify/search', async (req, res) => {
  const { q } = req.query;

  try {
    const results = await safeSpotifyRequest(() =>
      SpotifyApi.search(q as string, ['artist', 'album'])
    );
    res.send(results);
  } catch (err) {
    console.error('Failed to fetch spotify artist/albums search results:', err);
    res.status(500).send({
      message: `Failed to search Spotify for ${q}`
    });
  }
});

app.get('/spotify/album', async (req, res) => {
  const { id } = req.query;

  try {
    const results = await safeSpotifyRequest(() =>
      SpotifyApi.getAlbum(id as string)
    );
    res.send(results);
  } catch (err) {
    console.error(`Failed to fetch album id ${id} info:`, err);
    res.status(500).send({
      message: `Failed to fetch album ${id} info from Spotify`
    });
  }
});

app.get('/spotify/albums', async (req, res) => {
  const { artist } = req.query;

  try {
    const results = await safeSpotifyRequest(() =>
      SpotifyApi.getArtistAlbums(artist as string, { limit: 10 })
    );
    res.send(results);
  } catch (err) {
    console.error(
      `Failed to fetch albums by artist ${artist} search results:`,
      err
    );
    res.status(500).send({
      message: `Failed to search Spotify albums for artist ${artist}`
    });
  }
});

app.get('/spotify/artist', async (req, res) => {
  const { id } = req.query;

  try {
    const results = await safeSpotifyRequest(() =>
      SpotifyApi.getArtist(id as string)
    );
    res.send(results);
  } catch (err) {
    console.error(`Failed to fetch artist id ${id} info:`, err);
    res.status(500).send({
      message: `Failed to fetch artist ${id} info from Spotify`
    });
  }
});
