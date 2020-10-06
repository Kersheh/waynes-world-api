import config from 'config';
import { config as envConfig } from 'dotenv';
envConfig();

import app from './app';
import { setSpotifyAccessToken } from './modules/spotify';

// setup api routes
import './api';

(async () => {
  try {
    await setSpotifyAccessToken();

    const PORT = config.get('server.port');
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch(err) {
    console.log('Server failed to start.', err);
    process.exit(1);
  }
})();
