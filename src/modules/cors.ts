import config from 'config';
import cors from 'cors';

const corsOptions = {
  origin: config.get<string>('cors.origin'),
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};

const corsConfigured = cors(corsOptions);

export default corsConfigured;
