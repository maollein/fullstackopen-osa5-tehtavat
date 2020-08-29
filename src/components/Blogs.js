import React, { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import Notification from '../components/Notification';
import classes from '../constants/classes';
import AddBlogForm from './AddBlogForm';
import Togglable from '../components/Togglable';
import blogsService from '../services/blogs';

const Blogs = ({ blogs, user, logout }) => {
  const [blogList, setBlogList] = useState(blogs);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    setBlogList(sortBlogList(blogs));
  }, [blogs]);

  const sortBlogList = (listOfBlogs) => {
    const newBlogList = [...listOfBlogs];
    newBlogList.sort((a, b) => b.likes - a.likes);
    return newBlogList;
  };

  const addBlogFormRef = useRef();

  const notify = (message, style) => {
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setNotification({ message, style });
  };

  const addBlog = async (title, author, url) => {
    try {
      const newBlog = await blogsService.addBlog(title, author, url);
      addBlogFormRef.current.toggleVisibility();
      notify('Blog added', classes.SUCCESS);
      setBlogList(sortBlogList(blogList.concat(newBlog)));
    } catch (error) {
      notify(error.response.data.error, classes.ERROR);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogsService.deleteBlog(id);
      setBlogList(blogList.filter(blog => blog.id !== id));
      notify('Blog deleted', classes.SUCCESS);
    } catch (error) {
      notify(error.response.data.error, classes.ERROR);
    }
  };

  const likeBlog = async (id, blogToLike) => {
    const likedBlog = await blogsService.updateBlog(id, blogToLike);
    setBlogList(blogList.map(blog => blog.id === likedBlog.id ? likedBlog : blog));
  };

  return (
    <div>
      <h2>blogs</h2>
      {notification
        ? <Notification message={notification.message} style={notification.style} />
        : null
      }
      <p>{user.username} logged in <input type="button" onClick={logout} value='Log out' /></p>
      <Togglable buttonLabel="Add blog" ref={addBlogFormRef}>
        <AddBlogForm addBlog={addBlog} />
      </Togglable>
      <div id='blogs-list'>
        {blogList.map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} likeBlog={likeBlog} />
        )}
      </div>
    </div>
  );
};

export default Blogs;