import express from 'express';
import bodyParser from 'body-parser';

import corsConfigured from 'modules/cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsConfigured);

export default app;
