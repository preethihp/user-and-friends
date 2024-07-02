import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        grant_type: 'password',
        username,
        password,
        client_id: 'jFFt26G3ps83xg7h34BDS1lmOLn9Ed810vJXWs0j',
        client_secret: 'NkFj29ssYuEErobKwoX6oLX3lFd3KQwOBQLQukz9FzbQhkpBnQagKhcPhusPW84fIsJxHgVHiz9czsq6oKIjUUeEvstLGs6qykBeuXpVFvUUMt1IV8mDCbJTQawq8pIr',
      };

      const response = await axios.post('http://127.0.0.1:8000/o/token/', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      localStorage.setItem('token', response.data.access_token);
      
      history('/users');
      // setError('');
    } catch (error) {
      setError('Invalid credentials or request parameters.');
      console.error('Error logging in', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
