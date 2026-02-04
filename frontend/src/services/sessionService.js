import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5001/api/sessions" });

export const saveSession = (sessionData) => {
  return API.post('/', sessionData)
    .then(res => console.log('Session saved:', res.data))
    .catch(err => console.error('Error saving session:', err));
}

