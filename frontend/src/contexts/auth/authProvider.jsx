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
  baseURL: 'http://localhost:5001/auth',
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
  const [isAuthorised, setIsAuthorised] = useState(false);

  // --- Navigate ---
  const navigate = useNavigate();

  async function refreshToken() {
    try {
      const res = await authAPI.get('/token/refresh');
      setToken(res.data.token);
    } catch (err) {
      console.log(err); // Send user to /login page
      navigate('/login');
      setIsLoading(false);
      setIsAuthorised(false);
    }
  }

  useLayoutEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoading(false)
      setIsAuthorised(true)
    }
  }, [token]);


  useEffect(() => {
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
      async (err) => {
        const originalReq = err.config;
        if (!originalReq._retry) {
          try {
            await refreshToken()
            if (token) {
              originalReq._retry = true
              return mainAPI(originalReq)
            } else {
              setIsAuthorised(false);
              navigate('/login');
            }
          } catch (err) {
            return Promise.reject(err)
          }
        }

        originalReq._retry = true
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
        authAPI,
        isAuthorised
      }}
    >
      {isLoading ? <Loader /> : children}
    </authContext.Provider>
  )
}
