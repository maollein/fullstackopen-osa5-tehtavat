import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      );
    }
  }, [user]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const u = JSON.parse(loggedInUser);
      blogService.setToken(u.token);
      setUser(u);
    }
  }, []);

  const setUserToState = (loggedInUser) => {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    blogService.setToken(loggedInUser.token);
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    blogService.setToken(null);
    setUser(null);
  };

  return (
    <div>
      {user
        ? <Blogs blogs={blogs} user={user} logout={logout} />
        : <LoginForm setUserToState={setUserToState} />
      }
    </div>
  );
};

export default App;