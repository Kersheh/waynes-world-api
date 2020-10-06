import SpotifyApi from '../modules/spotify';

export const getAlbum = async () => {
  try {
    const res = await SpotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE');
    console.log('res', res);

    return res;
  } catch(err) {
    console.log('error', err);
  }
};
