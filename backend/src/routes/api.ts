import express from 'express';
import authRouter from './auth';
import padsRouter from './pads';
import checkJwt from '../middlewares/check-jwt';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/pads', checkJwt, padsRouter);

export default apiRouter;
