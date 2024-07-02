import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/', { username, password });
      navigate('/users');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleAddUser}>
      <h1>Add User</h1>
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
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
