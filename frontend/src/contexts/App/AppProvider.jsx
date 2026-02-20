import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../auth/authContext"

import { SettingsProvider } from "./settings/settingsProvider"
import { TimerProvider } from "./timer/timerProvider"


export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const { isAuthorised } = useContext(authContext)

  useEffect(() => {
    if (!isAuthorised) {
      navigate('/login')
    }
  }, [isAuthorised])

  return (
    isAuthorised &&
    <SettingsProvider>
      <TimerProvider>
        {children}
      </TimerProvider>
    </SettingsProvider>
  )
}