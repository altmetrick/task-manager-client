import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { register } from './authSlice';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };

    try {
      const res = await dispatch(register(user)).unwrap();
      console.log(res);
      navigate('/');
      toast.success(res.message);
      // setName('');
      // setEmail('');
      // setPassword('');
    } catch (err) {
      //@ts-ignore
      toast.error(err.message);
      console.log(err);
    }
  };

  const canSubmit = !name || !email || !password;

  return (
    <div className="form">
      <h2>Register</h2>
      <form className="form-auth" onSubmit={handleRegister}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
            required
          />
        </label>

        <button className="btn btn--action" type="submit" disabled={canSubmit}>
          Submit
        </button>
      </form>
      <div className="form__info">
        <span>Already registered? </span>
        <Link to={'/auth/login'}>Login</Link>
      </div>
    </div>
  );
}
