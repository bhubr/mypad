import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';
import SigninSignup from './pages/SigninSignup';
import ModifyPad from './pages/ModifyPad';

import './App.css';
import CreatePad from './pages/CreatePad';

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      {!user ? (
        <SigninSignup />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-pad" element={<CreatePad />} />
          <Route path="/pads/:id" element={<ModifyPad />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
