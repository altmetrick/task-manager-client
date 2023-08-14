import { FormEvent, useState } from 'react';
import './AthForm.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { AppDispatch } from '../../store/store';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //const { error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      const res = await dispatch(login(credentials)).unwrap();
      toast.success(res.message);
      navigate('/');
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const canLogin = !email || !password;

  // className={`${error && 'form-auth--error'}`}
  return (
    <div className="form">
      <h2>Login</h2>
      <form className="form-auth" onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn--action" disabled={canLogin}>
          Log-in
        </button>
      </form>
      <div className="form__info">
        <span>Not registered?</span>
        <Link to={'/auth/register'}>Register</Link>
      </div>
    </div>
  );
}
