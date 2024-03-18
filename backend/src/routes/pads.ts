import express from 'express';
import { insertPad, queryAsync } from '../db';
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

padsRouter.get('/:id', async (req, res) => {
  try {
    const [pad] = await queryAsync<
      Array<{
        id: number;
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
      }>
    >('SELECT * FROM pad WHERE id = ?', req.params.id);
    if (pad === undefined) {
      return res.status(404).json({ message: 'Pad not found' });
    }
    res.json(pad);
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
  const pad = await insertPad(payload)
  res.status(201).json(pad);
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
