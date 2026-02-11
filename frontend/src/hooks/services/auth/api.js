import axios from "axios";


export const mainAPI = axios.create({
  baseURL: 'http://localhost:5001/api',
})

export const authAPI = axios.create({
  baseURL: 'http://localhost:5002/api',
  withCredentials: true
})

mainAPI.interceptors.request.use((req) => {
  if (token) req.headers.Authorization = `Bearer ${token}`

  return req
})

mainAPI.interceptors.response.use((res) => {
  if (res.status === 401) {
    return console.log("no token attached")
  } else if (res.status === 403) {
    const newAToken = authAPI.get('api/token/refresh')
  }
})