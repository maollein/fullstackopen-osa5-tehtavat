import React, { useState } from 'react';
import './blog.css';
import PropTypes from 'prop-types';

const Blog = ({ blog, deleteBlog, user, likeBlog }) => {
  const [verbose, setVerbose] = useState(false);

  const toggleVerbose = () => {
    setVerbose(!verbose);
  };

  const conciseContent = () => {
    return <p>{blog.title} {blog.author} {getStateButton()}</p>;
  };

  const getStateButton = () => {
    return <input type='button' value={verbose ? 'hide' : 'view'} onClick={toggleVerbose} />;
  };

  const getDeleteButton = () => {
    if (blog.user.id === user.id) {
      return <input type='button' value='delete' onClick={confirmAndDelete} className='delete-button'/>;
    } else return null;
  };

  const like = () => {
    const blogToLike = { ...blog, likes: blog.likes + 1 };
    likeBlog(blog.id, blogToLike);
  };

  const confirmAndDelete = () => {
    if (window.confirm('Permanently delete this blog')) {
      deleteBlog(blog.id);
    }
  };

  const verboseContent = () => {
    return (
      <>
        <p>{blog.title} {blog.author} {getStateButton()}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <input type='button' value='like' onClick={like} /> </p>
        <p>{blog.user.name}</p>
        {getDeleteButton()}
      </>
    );
  };

  return (
    <div className='blog'>
      {verbose
        ? verboseContent()
        : conciseContent()
      }
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;
