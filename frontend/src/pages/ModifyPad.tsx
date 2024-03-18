import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditPad from '../components/EditPad';
import { IPad } from '../types';
import { readOnePad } from '../api';

export default function ModifyPad() {
  const { id } = useParams();
  const [pad, setPad] = useState<null | IPad>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readOnePad(Number(id))
      .then(setPad)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (pad === null) {
    return <div>Pad not found</div>;
  }

  return <EditPad pad={pad} mode="modify" />;
}
