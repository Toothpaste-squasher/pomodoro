import { useState, useLayoutEffect, useEffect } from "react"
import { Loader } from 'lucide-react'
import { authContext } from "./authContext"
import axios from "axios";


// --- APIs ---
const mainAPI = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

const authAPI = axios.create({
  baseURL: 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// --- Context provider ---
export const AuthProvider = ({ children }) => {

  // --- States ---
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    authAPI.get('/token/refresh').then(
      (res) => {
        setToken(res.data.token)
      }
    ).catch((err) => {
      console.log(err) // Send user to /login page
    })
  }, [])


  useEffect(() => {
    const interceptor = mainAPI.interceptors.request.use(
      (req) => {
        if (token) {
          req.headers.Authorization = `Bearer ${token}`
        }
        return req
      }
    )

    return () => {
      mainAPI.interceptors.request.eject(interceptor)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      setIsLoading(false)
    }
  }, [token])

  return (
    <authContext.Provider
      value={{
        setToken,
        mainAPI,
        authAPI
      }}
    >
      {isLoading ? <Loader /> : children}
    </authContext.Provider>
  )
}
