import { parseISO, isBefore } from 'date-fns';

import app from 'app';
import {
  getAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  AlbumSort
} from 'services/libraryService';

app.get('/library', async (req, res) => {
  const { sort, order } = req.query;

  try {
    const data = await getAlbums({
      sortBy: sort,
      order
    } as AlbumSort);

    res.status(200).send({
      albumsAll: data.albumsAllSorted,
      albumsRecentlyAdded: data.albumsAll
        .sort((a: any, b: any) =>
          isBefore(parseISO(a.createdAt), parseISO(b.createdAt)) ? 1 : -1
        )
        .slice(0, 10)
    });
  } catch (err) {
    console.error('Failed to fetch albums', err);
    res.status(500).send({ message: 'Failed to fetch all albums' });
  }
});

app.post('/library/album', async (req, res) => {
  const album = req.body;

  try {
    const id = await addAlbum(album);
    res.status(201).send({ id });
  } catch (err) {
    console.error('Failed to create album:', err);
    res.status(500).send({ message: err.message });
  }
});

app.put('/library/album/:id', async (req, res) => {
  const { id } = req.params;
  const album = req.body;

  try {
    await updateAlbum(id, album);
    res.status(200).send({ id });
  } catch (err) {
    console.error(`Failed to update album ${id}:`, err);
    res.status(500).send({
      message: `Failed to update album ${album.album} for id ${id}`
    });
  }
});

app.delete('/library/album/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deleteAlbum(id);
    res.status(200).send();
  } catch (err) {
    console.error(`Failed to delete album ${id}:`, err);
    res.status(500).send({
      message: `Failed to delete album id ${id}`
    });
  }
});
