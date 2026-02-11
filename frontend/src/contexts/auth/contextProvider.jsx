import { useState } from "react"
import { authContext } from "./authContext"
import { useEffect } from "react";
import axios from "axios";


export const AuthProvider = ({ children }) => {
  // --- APIs ---
  const mainAPI = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  })

  const authAPI = axios.create({
    baseURL: 'http://localhost:5002',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  })

  // --- States ---
  const [token, setToken] = useState(null);

  useEffect(() => {
    authAPI.get('/api/token/refresh').then(
      (res) => {
        setToken(res.data.token)
      }
    ).catch((err) => {
      console.log(err) // Send user to /login page
    })
  }, [])


  mainAPI.interceptors.request.use(
    (req) => {
      if (!token) {
        return
      }


      req.headers.Authorization = `Bearer ${token}`
      return req
    }
  )

  return (
    <authContext.Provider
      value={{
        setToken,
        mainAPI,
        authAPI
      }}
    >
      {children}
    </authContext.Provider>
  )
}
