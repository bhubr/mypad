import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { signin, signup } from '../api';

import './SigninSignup.css';

type SigninSignupMode = 'signin' | 'signup';

const getStyle = (active: boolean) => ({
  backgroundColor: active ? 'lightblue' : '#555',
});

export default function SigninSignup() {
  const [mode, setMode] = useState<SigninSignupMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'signin') {
      const user = await signin(email, password);
      console.log('logged-in', user);
      setUser(user);
    } else {
      await signup(email, password);
    }
  };

  return (
    <div className="SigninSignup">
      <h1>{mode === 'signin' ? 'Sign in' : 'Sign up'}</h1>
      <button
        style={getStyle(mode === 'signin')}
        onClick={() => setMode('signin')}
      >
        Sign in
      </button>
      <button
        style={getStyle(mode === 'signup')}
        onClick={() => setMode('signup')}
      >
        Sign up
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-element">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
