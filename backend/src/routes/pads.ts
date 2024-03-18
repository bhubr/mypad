import express from 'express';
import { queryAsync } from '../db';
import isEmpty from '../helpers/is-empty';

const padsRouter = express.Router();

padsRouter.get('/', async (req, res) => {
  try {
    const pads = await queryAsync('SELECT * FROM pad');
    res.json(pads);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

padsRouter.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (isEmpty(title) || isEmpty(content)) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const createdAt = new Date().toISOString();
  const payload = { title, content, createdAt, updatedAt: createdAt };
  await queryAsync(
    `INSERT INTO pad (title, content, createdAt, updatedAt)
    VALUES (?, ?, ?, ?)`,
    payload.title,
    payload.content,
    payload.createdAt,
    payload.updatedAt,
  );
  res.status(201).json(payload);
});

padsRouter.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  if (isEmpty(title) || isEmpty(content)) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const updatedAt = new Date().toISOString();
  const payload = { title, content, updatedAt };
  await queryAsync(
    `UPDATE pad
    SET title = ?, content = ?, updatedAt = ?
    WHERE id = ?`,
    payload.title,
    payload.content,
    payload.updatedAt,
    req.params.id,
  );
  res.json({ ...payload, id: req.params.id });
});

padsRouter.delete('/:id', async (req, res) => {
  await queryAsync('DELETE FROM pad WHERE id = ?', req.params.id);
  res.status(204).end();
});

export default padsRouter;
