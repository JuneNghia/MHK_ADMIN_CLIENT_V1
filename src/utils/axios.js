import axios from 'axios';

const token = localStorage.getItem('serviceToken');

const services = axios.create({
  baseURL: 'http://localhost:8000/mhk-api/v2/',
  headers: {
    'token': `${token}`
  }
});

export default services;
