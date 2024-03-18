import express from 'express';
import authRouter from './auth';
import padsRouter from './pads';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/pads', padsRouter);

export default apiRouter;
