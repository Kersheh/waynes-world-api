import config from 'config';
import SpotifyWebApi from 'spotify-web-api-node';

const SpotifyApi = new SpotifyWebApi({
  clientId: config.get('spotify.clientId'),
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export const setSpotifyAccessToken = async () => {
  try {
    const data = await SpotifyApi.clientCredentialsGrant();
    SpotifyApi.setAccessToken(data.body['access_token']);
  } catch(err) {
    console.error('Failed to retrieve Spotify API access token.');
    throw err;
  }
};

export const safeSpotifyRequest = async (spotifyReq: Function, retry = true) => {
  try {
    return spotifyReq();
  } catch(err) {
    console.error(err);

    // refresh token and retry request
    if (retry) {
      await setSpotifyAccessToken();
      safeSpotifyRequest(spotifyReq, false);
    }
  }
};

export default SpotifyApi;
