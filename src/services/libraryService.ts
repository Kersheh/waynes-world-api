import AlbumModel, { Album } from '../models/Album';

export const getAlbums = async () => {
  return AlbumModel.find();
};

export const addAlbum = async (album: Album) => {
  const existingAlbum = await AlbumModel.findOne({
    album: album.album,
    artist: album.artist
  });

  if (!existingAlbum) {
    const { _id: id } = await AlbumModel.create(album);
    return id;
  } else {
    throw new Error(
      `Album ${album.album} by artist ${album.artist} already exists.`
    );
  }
};

export const updateAlbum = async (id: string, album: Album) => {
  return AlbumModel.updateOne({ _id: id }, album);
};

export const deleteAlbum = async (id: string) => {
  return AlbumModel.deleteOne({ _id: id });
};
