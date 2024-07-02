import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from './components/userItem'
import AddUser from './components/addUser';
import Login from './components/login';
import AddFriend from './components/addFriend';

const ErrorFallback = () => {
  return <div>Something went wrong. Please try again later.</div>;
};

class App extends React.Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    console.error('Error caught by error boundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    const isAuthenticated = !!localStorage.getItem('token');

    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/users" 
              element={isAuthenticated ? <UserList /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/add-user" 
              element={isAuthenticated ? <AddUser /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/add-friend" 
              element={isAuthenticated ? <AddFriend /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/users" /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
