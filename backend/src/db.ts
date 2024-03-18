import sqlite3module from 'sqlite3';
import { resolve } from 'path';
import { dbFile } from './settings';
import type { IPad, IPadDTO, IUser, IUserDTO, Scalar } from './types';

const sqlite3 = sqlite3module.verbose();
const dbFilePath = resolve(__dirname, '..', dbFile);
const db = new sqlite3.Database(dbFilePath);

export async function queryAsync<T = void>(
  sql: string,
  ...args: Scalar[]
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

export async function insertIntoTable<U, V>(
  table: string,
  payload: U,
): Promise<V> {
  const typedPayload = payload as Record<string, Scalar>;
  const columns = Object.keys(typedPayload);
  const values = Object.values(typedPayload);
  const placeholders = new Array(columns.length).fill('?');
  const sql = `INSERT INTO ${table}
      (${columns.join(', ')})
    VALUES
      (${placeholders.join(', ')})`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await queryAsync(sql, ...values);
  const rows = await queryAsync<[{ id: number }]>(
    'SELECT last_insert_rowid() as id',
  );
  const id = rows[0].id;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const record = { id, ...payload } as V;
  return record;
}

export async function insertUser(payload: IUserDTO): Promise<IUser> {
  // await queryAsync(
  //   `INSERT INTO user
  //     (email, passwordHash, createdAt, updatedAt)
  //   VALUES
  //     (?, ?, ?, ?)`,
  //   payload.email,
  //   payload.passwordHash,
  //   payload.createdAt,
  //   payload.updatedAt,
  // );
  // const rows = await queryAsync<[{ id: number }]>(
  //   'SELECT last_insert_rowid() as id',
  // );
  // const { passwordHash, ...rest } = payload;
  // return { id: rows[0].id, ...rest };
  return await insertIntoTable<IUserDTO, IUser>('user', payload);
}

export async function insertPad(payload: IPadDTO): Promise<IPad> {
  await queryAsync(
    `INSERT INTO pad (title, content, createdAt, updatedAt)
    VALUES (?, ?, ?, ?)`,
    payload.title,
    payload.content,
    payload.createdAt,
    payload.updatedAt,
  );
  const rows = await queryAsync<[{ id: number }]>(
    'SELECT last_insert_rowid() as id',
  );
  return { id: rows[0].id, ...payload };
}
