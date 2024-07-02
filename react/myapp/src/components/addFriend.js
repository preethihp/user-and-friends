import React, { useState } from 'react';
import api from '../api';
import '../App.css';

const AddFriend = ({ userId }) => {
  const [friendUsername, setFriendUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleAddFriend = async () => {
    try {
      const response = await api.post('/friends/add_friend/', {
        user_id: userId,
        friend_username: friendUsername,
      });
      setMessage(response.data.status);
      setFriendUsername('');
    } catch (error) {
      setMessage('Error adding friend');
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Friend's Username"
        value={friendUsername}
        onChange={(e) => setFriendUsername(e.target.value)}
      />
      <button onClick={handleAddFriend}>Add Friend</button>
      <p>{message}</p>
    </div>
  );
};

export default AddFriend;
