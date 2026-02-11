import { useContext } from "react";
import { authContext } from "../../contexts/auth/authContext";


const useSessionService = () => {
  const { mainAPI } = useContext(authContext)

  const saveSession = (sessionData) => {
    return mainAPI.post('/session', sessionData)
      .then(res => console.log('Session saved:', res.data))
      .catch(err => console.error('Error saving session:', err));
  }

  return {
    saveSession
  }
}

export default useSessionService;