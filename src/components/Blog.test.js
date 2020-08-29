import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

describe('Blog component tests', () => {

  let component;
  let mockDeleteBlog;
  let likeBlog;

  const user = {
    id: '24er43',
    token: 'f234tq34fas',
    username: 'TestUser'
  };

  const blog = {
    title: 'Test title',
    author: 'TestUser',
    likes: 2,
    url: 'https://blogs.example.com/TestUser/test-title',
    user: {
      id: '24er43',
      username: 'TestUser',
      name: 'Test User'
    }
  };

  beforeEach(() => {
    mockDeleteBlog = jest.fn();
    likeBlog = jest.fn();
    component = render(<Blog
      blog={blog}
      user={user}
      deleteBlog={mockDeleteBlog}
      likeBlog={likeBlog}
    />);
  });

  test('Renders only title and author by default', () => {
    expect(component.container).toHaveTextContent(
      'Test title TestUser'
    );
    expect(component.container.children[0].children).toHaveLength(1);
  });

  test('Renders all info after view button click', () => {
    const viewBtn = component.container.querySelector('input');

    fireEvent.click(viewBtn);

    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author} ${blog.url}likes ${blog.likes} ${blog.user.name}`
    );

    expect(component.container.children[0].children).toHaveLength(5);
  });

  test('Like button is clickable multiple times', () => {
    const viewBtn = component.container.querySelector('input');
    fireEvent.click(viewBtn);
    const likeBtn = component.getByText('like');
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);
    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
