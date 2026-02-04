import { useState } from "react"
import { authContext } from "./authContext"


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

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