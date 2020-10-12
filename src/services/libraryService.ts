import AlbumModel, { Album } from '../models/Album';

export const addAlbum = async (album: Album) => {
  return AlbumModel.create(album);
};

export const updateAlbum = async (id: string, album: Album) => {
  return AlbumModel.updateOne({ _id: id }, album);
};
