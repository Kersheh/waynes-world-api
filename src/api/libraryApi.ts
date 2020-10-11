import app from '../app';
import { addAlbum } from '../services/libraryService';

app.post('/library/album', async (req, res) => {
  const album = req.body;

  try {
    await addAlbum(album);
    res.status(201).send();
  } catch (err) {
    console.error('Failed to create album:', err);
    res.status(500).send({
      message: `Failed to create album ${album.album}`
    });
  }
});
