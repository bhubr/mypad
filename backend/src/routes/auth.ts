import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import isEmpty from '../helpers/is-empty';
import { insertUser } from '../db';
import { jwtSecret } from '../settings';

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

export default authRouter;
