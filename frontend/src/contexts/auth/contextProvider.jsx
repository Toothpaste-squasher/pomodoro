import { useState } from "react"
import { authContext } from "./authContext"
import { useEffect } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:5002',
})


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);


  useEffect(() => {
    API.get('/api/token/refresh')
  }, [])

  return (
    <authContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </authContext.Provider>
  )
}
