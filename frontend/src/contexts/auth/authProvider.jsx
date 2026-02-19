import { useState, useLayoutEffect, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
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

  // --- Navigate ---
  const navigate = useNavigate();

  function refreshToken() {
    authAPI.get('/token/refresh').then(
      (res) => {
        setToken(res.data.token)
      }
    ).catch((err) => {
      console.log(err) // Send user to /login page
      navigate('/login')
      setIsLoading(false)
    })
  }

  useLayoutEffect(() => {
    refreshToken();
  }, [])


  useEffect(() => {
    if (token) {
      setIsLoading(false)
    }
    const reqInterceptor = mainAPI.interceptors.request.use(
      (req) => {
        if (token) {
          req.headers.Authorization = `Bearer ${token}`
        }
        return req
      }
    )

    const resInterceptor = mainAPI.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401) {
          refreshToken()
        }
        return Promise.reject(err)
      }
    )

    return () => {
      mainAPI.interceptors.request.eject(reqInterceptor)
      mainAPI.interceptors.response.eject(resInterceptor)
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
