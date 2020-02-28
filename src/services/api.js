/* eslint-disable camelcase */
// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = baseURL => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'Application/json',
    },
    // 20 second timeout...
    timeout: 20000,
  });

  api.addMonitor(response => {
    console.log('%c RESPONSE', 'color: yellow', response);
  });

  const getUsers = (id = '') => api.get(`users/${id}`);

  const getTodos = (userId = '') => api.get(`todos/`, { userId });

  return {
    getUsers,
    getTodos,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
