import React, { useState, useEffect } from 'react';
import api from '../api';

const ModifyUser = ({ match }) => {
  const userId = match.params.id;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}/`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleModifyUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${userId}/`, { username, password });
      // Redirect or update user list
    } catch (error) {
      console.error('Error modifying user:', error);
    }
  };

  return (
    <form onSubmit={handleModifyUser}>
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
      <button type="submit">Modify User</button>
    </form>
  );
};

export default ModifyUser;
