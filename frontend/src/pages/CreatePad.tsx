import { useState } from 'react';
import EditPad from '../components/EditPad';
import { IPad } from '../types';

export default function CreatePad() {
  const [pad] = useState<IPad>({
    id: 0,
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
  });

  return <EditPad pad={pad} mode="create" />;
}
