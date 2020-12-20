import config from 'config';
import SpotifyWebApi from 'spotify-web-api-node';

const SpotifyApi = new SpotifyWebApi({
  clientId: config.get('spotify.clientId'),
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export const setSpotifyAccessToken: () => Promise<void> = async () => {
  try {
    const data = await SpotifyApi.clientCredentialsGrant();
    SpotifyApi.setAccessToken(data.body['access_token']);
  } catch (err) {
    console.error('Failed to retrieve Spotify API access token.');
    throw err;
  }
};

export async function safeSpotifyRequest<T>(
  spotifyReq: any,
  retry = true
): Promise<T | void> {
  try {
    return await spotifyReq();
  } catch (err) {
    // refresh token and retry request
    if (retry) {
      await setSpotifyAccessToken();
      return await safeSpotifyRequest(spotifyReq, false);
    } else {
      console.error('Failed to refresh token and retry request:', err);
    }
  }
}

export default SpotifyApi;
