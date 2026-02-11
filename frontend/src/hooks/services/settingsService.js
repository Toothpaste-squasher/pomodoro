import { useContext } from "react";
import { authContext } from "../../contexts/auth/authContext";

const useSettingsService = () => {
  const { mainAPI } = useContext(authContext)

  const updateSetting = (id, value) => {
    const newSet = { [id]: value }
    return mainAPI.patch('/settings/1', newSet)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  const getSettings = () => {
    return mainAPI.get('/settings')
  }

  return {
    updateSetting,
    getSettings
  }
}

export default useSettingsService;