import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const addBlog = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, { title, author, url }, config);
  return request.data;
};

const updateBlog = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/${id}`, blog, config);
  return request.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

export default { getAll, addBlog, setToken, updateBlog, deleteBlog };