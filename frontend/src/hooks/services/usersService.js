import { useContext } from "react"
import { authContext } from "../../contexts/auth/authContext"


const useUsersService = () => {
  const { authAPI } = useContext(authContext)

  const login = (user) => {
    return authAPI.post('/users/login', user)
      .catch(err => console.error(err))
  }

  const register = (user) => {
    return authAPI.post('/users/register', user)
      .catch(err => console.error(err))
  }

  return {
    login,
    register
  }
}

export default useUsersService
