import sqlite3module from 'sqlite3';
import { resolve } from 'path';
import { dbFile } from './settings';

const sqlite3 = sqlite3module.verbose();
const dbFilePath = resolve(__dirname, '..', dbFile);
const db = new sqlite3.Database(dbFilePath);

export async function queryAsync<T = void>(
  sql: string,
  ...args: any[]
): Promise<T> {
  return await new Promise((resolve, reject) => {
    const stmt = db.prepare(sql);
    stmt.all(...args, (err: Error, rows: T) => {
      if (err instanceof Error) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function insertUser(payload: {
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}): Promise<{
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}> {
  await queryAsync(
    `INSERT INTO user
      (email, passwordHash, createdAt, updatedAt)
    VALUES
      (?, ?, ?, ?)`,
    payload.email,
    payload.passwordHash,
    payload.createdAt,
    payload.updatedAt,
  );
  const rows = await queryAsync<[{ id: number }]>(
    'SELECT last_insert_rowid() as id',
  );
  const { passwordHash, ...rest } = payload;
  return { id: rows[0].id, ...rest };
}
