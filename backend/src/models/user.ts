import argon2 from 'argon2';
import { insertUser } from '../db';
import type { IUser } from '../types';

export async function createUser(
  email: string,
  password: string,
): Promise<IUser> {
  const passwordHash = await argon2.hash(password);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const payload = { email, passwordHash, createdAt, updatedAt };
  const user = await insertUser(payload);
  return user;
}
