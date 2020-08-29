import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlogForm from './AddBlogForm';

describe('Add blog form tests', () => {

  let component;
  let addBlog;

  beforeEach(() => {
    addBlog = jest.fn();
    component = render(<AddBlogForm addBlog={addBlog} />);
  });

  test('Add blog function called with required info', () => {
    const titleInput = component.container.querySelector('#add-blog-title');
    const authorInput = component.container.querySelector('#add-blog-author');
    const urlInput = component.container.querySelector('#add-blog-url');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, {
      target: { value: 'Test title' }
    });
    fireEvent.change(authorInput, {
      target: { value: 'Test author' }
    });
    fireEvent.change(urlInput, {
      target: { value: 'Test url' }
    });
    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0]).toBe('Test title');
    expect(addBlog.mock.calls[0][1]).toBe('Test author');
    expect(addBlog.mock.calls[0][2]).toBe('Test url');
  });

});