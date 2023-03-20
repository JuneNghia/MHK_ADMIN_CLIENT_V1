import axios from 'axios';

const token = localStorage.getItem('serviceToken');

const services = axios.create({
  baseURL: 'http://localhost:8000/mhk-api/v1/',
  headers: {
    'token': `${token}`
  }
});


// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
// );

export default services;
