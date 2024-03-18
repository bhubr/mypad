import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';

import './App.css';
import SigninSignup from './pages/SigninSignup';

function App() {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <div>
      {!user ? (
        <SigninSignup />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/pads/new" element={<CreatePad />} />
        <Route path="/pads/:id" element={<EditPad />} /> */}
        </Routes>
      )}
    </div>
  );
}

export default App;
