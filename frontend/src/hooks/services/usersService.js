import { useContext } from "react"
import { authContext } from "../../contexts/auth/authContext"


const useUsersService = () => {
  const { authAPI } = useContext(authContext)

  const login = (user) => {
    if (user.email === '' || user.password === '') {
      return Promise.reject(new Error("Email or password is not provided in the request"))
    }
    return authAPI.post('/users/login', user)
  }

  const register = (user) => {
    if (user.username === '' || user.password === '' || user.email === '') {
      return Promise.reject(new Error("Username or password or email is not provided in the request"))
    }
    return authAPI.post('/users/register', user)
  }

  return {
    login,
    register
  }
}

export default useUsersService
