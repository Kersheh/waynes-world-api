import express from 'express';
import corsConfigured from './modules/cors';

const app = express();
app.use(corsConfigured);

export default app;
