import app from '../app';
import { addAlbum, updateAlbum } from '../services/libraryService';

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

app.put('/library/album/:id', async (req, res) => {
  const { id } = req.params;
  const album = req.body;

  try {
    await updateAlbum(id, album);
    res.status(200).send();
  } catch (err) {
    console.error(`Failed to update album ${id}:`, err);
    res.status(500).send({
      message: `Failed to update album ${album.album} for id ${id}`
    });
  }
});
