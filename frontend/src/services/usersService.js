import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api/users"
})

export const login = (user) => {
  return API.post('/login', user).then
}

export const register = (user) => {
  return API.post('/register', user)
}