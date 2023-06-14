// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Substitua pela URL da sua API
  timeout: 5000, // Defina um tempo limite adequado
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;