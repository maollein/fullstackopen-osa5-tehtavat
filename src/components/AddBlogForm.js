import React, { useState } from 'react';

const AddBlogForm = ({ addBlog }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='add-blog-title'>Title</label>
        <input id='add-blog-title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor='add-blog-author'>Author</label>
        <input id='add-blog-author' type='text' value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        <label htmlFor='add-blog-url'>Url</label>
        <input id='add-blog-url' type='text' value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <input id='add-blog-btn' type='submit' value='Add' />
    </form>
  );

};

export default AddBlogForm;