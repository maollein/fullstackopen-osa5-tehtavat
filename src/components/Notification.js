import React from 'react';
import './notification.css';

const Notification = ({ message, style }) => {
  return (
    <div className={style}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;