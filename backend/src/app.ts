import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { join } from 'path';

import apiRouter from './routes/api';
import { isProduction } from './settings';

const app = express();
if (!isProduction) {
  app.use(
    cors({
      origin: 'http://192.168.1.35:5173',
      credentials: true,
    }),
  );
}
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', apiRouter);

if (isProduction) {
  // frontend dist will be copied into backend dist
  console.log('isProduction', isProduction);
  const frontendPath = join(__dirname, 'frontend-dist');
  const frontendIndex = join(frontendPath, 'index.html');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => res.sendFile(frontendIndex));
}

export default app;
