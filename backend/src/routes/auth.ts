import express, { Request } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import isEmpty from '../helpers/is-empty';
import { insertUser, queryAsync } from '../db';
import { jwtSecret } from '../settings';
import checkJwt from '../middlewares/check-jwt';

const authRouter = express.Router();

const createJwt = (userId: number): string =>
  jwt.sign({ userId }, jwtSecret, {
    expiresIn: '1d',
  });

authRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, isEmpty(email), isEmpty(password));
  if (isEmpty(email) || isEmpty(password)) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const passwordHash = await argon2.hash(password as string);
    const createdAt = new Date().toISOString();
    const payload = { email, passwordHash, createdAt, updatedAt: createdAt };
    const user = await insertUser(payload);
    const jwt = createJwt(user.id);
    res.cookie('jwt', jwt, { httpOnly: true });
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    const message = (err as Error).message;
    return res.status(400).json({ error: message });
  }
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, isEmpty(email), isEmpty(password));
  if (isEmpty(email) || isEmpty(password)) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const [user] = await queryAsync<
      Array<{
        id: number;
        email: string;
        passwordHash: string;
      }>
    >(
      `SELECT id, email, passwordHash
        FROM user
        WHERE email = ?`,
      email,
    );
    if (user === undefined) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await argon2.verify(
      user.passwordHash,
      password as string,
    );
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const jwt = createJwt(user.id);
    res.cookie('jwt', jwt, { httpOnly: true });
    return res.status(200).json({ id: user.id, email: user.email, jwt });
  } catch (err) {
    const message = (err as Error).message;
    return res.status(400).json({ error: message });
  }
});

interface AuthRequest extends Request {
  auth?: {
    userId: number;
  };
}

authRouter.get('/me', checkJwt, async (req: AuthRequest, res) => {
  console.log('>> auth', req.auth);
  if (req.auth === undefined) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { userId } = req.auth;
  console.log('userId', userId);
  const [user] = await queryAsync<
    Array<{
      id: number;
      email: string;
      createdAt: string;
      updatedAt: string;
    }>
  >(
    `SELECT id, email, createdAt, updatedAt
      FROM user
      WHERE id = ?`,
    userId,
  );
  console.log(user, 'user');
  return res.status(200).json(user);
});

export default authRouter;
