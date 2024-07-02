import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import AddFriend from './addFriend';
import EditUser from './editUser';
import '../App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleEditComplete = () => {
    setEditingUserId(null);
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <Link to="/add-user" className="btn btn-primary mb-3">
        Add User
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {editingUserId === user.id ? (
              <EditUser user={user} onComplete={handleEditComplete} />
            ) : (
              <>
                <span>{user.username}</span>
                <AddFriend userId={user.id} />
                <div className="friend-list">
                  <h4>Friends:</h4>
                  <ul>
                    {user.friends.map((friend) => (
                      <li key={friend.id}>{friend.username}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditClick(user.id)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const deleteUser = async (userId) => {
  try {
    await api.delete(`/users/${userId}/`);
    window.location.reload(); // For simplicity; consider using state management to update UI
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export default UserList;
