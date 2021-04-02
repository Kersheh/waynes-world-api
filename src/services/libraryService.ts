import { sortBy, reverse } from 'lodash';

import AlbumModel, { Album } from 'models/Album';

export interface AlbumSort {
  sortBy: 'artist' | 'album' | 'genre' | 'year';
  order: 'asc' | 'desc';
}

export const getAlbums = async (
  sort: AlbumSort = {
    sortBy: 'artist',
    order: 'asc'
  }
) => {
  const albums = await AlbumModel.find().select(['-artBase64']);

  switch (sort.sortBy) {
    case 'artist':
      return {
        albumsAll: albums,
        albumsAllSorted:
          sort.order === 'asc'
            ? sortBy(albums, 'artist')
            : reverse(sortBy(albums, 'artist'))
      };
    case 'album':
      return {
        albumsAll: albums,
        albumsAllSorted:
          sort.order === 'asc'
            ? sortBy(albums, 'album')
            : reverse(sortBy(albums, 'album'))
      };
    case 'genre':
      return {
        albumsAll: albums,
        albumsAllSorted:
          sort.order === 'asc'
            ? sortBy(albums, 'genre')
            : reverse(sortBy(albums, 'genre'))
      };
    case 'year':
      return {
        albumsAll: albums,
        albumsAllSorted:
          sort.order === 'asc'
            ? sortBy(albums, 'year')
            : reverse(sortBy(albums, 'year'))
      };
    default:
      return {
        albumsAll: albums,
        albumsAllSorted: sort.order === 'asc' ? albums : reverse(albums)
      };
  }
};

export const getAlbumArt = async (id: string) => {
  const album = await AlbumModel.findOne({ _id: id });
  return album?.artBase64;
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

export const favouriteAlbum = async (id: string) => {
  return AlbumModel.updateOne(
    { _id: id },
    { favourite: true, favouritedAt: new Date() }
  );
};

export const unfavouriteAlbum = async (id: string) => {
  return AlbumModel.updateOne(
    { _id: id },
    { favourite: false, favouritedAt: undefined }
  );
};
