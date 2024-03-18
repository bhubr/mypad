import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPad } from '../types';
import { createPad, updatePad } from '../api';

import "./EditPad.css";

export type EditPadMode = 'create' | 'modify';

export default function EditPad({
  pad,
  mode,
}: {
  pad: IPad;
  mode: EditPadMode;
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(pad.title);
  const [content, setContent] = useState(pad.content);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    if (mode === 'create') {
      console.log('create');
      const pad = await createPad({ title, content });
      navigate(`/pads/${pad.id}`);
    } else {
      console.log('modify');
      await updatePad(pad.id, { title, content });
    }
  };
  return (
    <div className="EditPad">
      <h1>Edit Pad</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
