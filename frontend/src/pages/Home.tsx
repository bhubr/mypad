import { useEffect, useState } from 'react';
import { readPads } from '../api';
import { IPad } from '../types';

export default function Home() {
  const [pads, setPads] = useState<null | IPad[]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  useEffect(() => {
    readPads()
      .then(setPads)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Pads</h1>
      {pads?.map((pad) => (
        <div key={pad.id}>
          <h2>{pad.title}</h2>
          <p>{pad.content}</p>
        </div>
      ))}
    </div>
  );
}
