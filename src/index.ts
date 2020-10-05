import express from 'express';
import config from 'config';

const app = express();
const PORT = config.get('server.port');

app.get('/', (_, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
