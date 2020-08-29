import React, { useState } from 'react';
import Notification from './Notification';
import loginService from '../services/login';
import classes from '../constants/classes';


const LoginForm = ({ setUserToState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(false);

  const notify = (message, style) => {
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setNotification({ message, style });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginService.login(username, password);
      setUserToState(loggedInUser);
    } catch (error) {
      notify(error.response.data.error, classes.ERROR);
    }

  };

  return (
    <div>
      <h2>Login</h2>
      { notification
        ? <Notification message={notification.message} style={notification.style} />
        : null
      }
      <form id='login-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='login-username-input'>Username</label>
          <input id='login-username-input' type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor='login-password-input'>Password</label>
          <input id='login-password-input' type='text' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <input id='login-btn' type='submit' value='Login' />
      </form>
    </div>
  );
};

export default LoginForm;