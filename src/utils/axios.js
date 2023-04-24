import axios from 'axios';

const token = localStorage.getItem('serviceToken');

const services = axios.create({
  baseURL: 'https://mhk-api-v2.onrender.com/cloud-api',
  headers: {
    'token': `${token}`
  }
});

export default services;
