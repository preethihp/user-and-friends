import React, { useState } from 'react';
import api from '../api';
import '../App.css';

const EditUser = ({ user, onComplete }) => {
  const [username, setUsername] = useState(user.username);

  const handleSave = async () => {
    try {
      await api.put(`/users/${user.id}/`, {
        username,
      });
      onComplete();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="edit-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-control"
      />
      <button className="btn btn-primary btn-sm mr-2" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-secondary btn-sm" onClick={onComplete}>
        Cancel
      </button>
    </div>
  );
};

export default EditUser;
