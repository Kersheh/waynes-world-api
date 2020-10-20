import AlbumModel, { Album } from '../models/Album';

export const getAlbums = async () => {
  return AlbumModel.find();
};

export const addAlbum = async (album: Album) => {
  const { _id: id } = await AlbumModel.create(album);
  return id;
};

export const updateAlbum = async (id: string, album: Album) => {
  return AlbumModel.updateOne({ _id: id }, album);
};

export const deleteAlbum = async (id: string) => {
  return AlbumModel.deleteOne({ _id: id });
};
