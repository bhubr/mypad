import app from './app';
import { port } from './settings';

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
