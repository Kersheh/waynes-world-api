// import mongoose from '../modules/mongoose';
import AlbumModel, { Album } from '../models/Album';

export const addAlbum = async (album: Album) => {
  return AlbumModel.create(album);
};
