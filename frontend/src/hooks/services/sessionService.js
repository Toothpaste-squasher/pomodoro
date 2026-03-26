import { useContext } from "react";
import { authContext } from "../../contexts/auth/authContext";


const useSessionService = () => {
  const { mainAPI } = useContext(authContext)

  const getSessions = async () => {
    try {
      const res = await mainAPI.get('/sessions')
      return res.data.data
    } catch (err) {
      console.error('Error fetching study sessions:', err)
    }
  }

  const saveSession = async (sessionData) => {
    try {
      const res = await mainAPI.post('/sessions', { newSesh: sessionData })
      return res.data.message
    } catch (err) {
      console.error('Error saving session:', err)
    }
  }

  return {
    getSessions,
    saveSession
  }
}

export default useSessionService;