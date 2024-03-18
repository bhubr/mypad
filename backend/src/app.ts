import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import apiRouter from './routes/api';
import { isProduction } from './settings';

const app = express();
if (!isProduction) {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );
}
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', apiRouter);

export default app;
