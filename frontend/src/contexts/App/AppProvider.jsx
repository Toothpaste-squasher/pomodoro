import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../auth/authContext.js"

import { SettingsProvider } from "./settings/settingsProvider.jsx"
import { TimerProvider } from "./timer/timerProvider.jsx"
import { TaskProvider } from "./task/taskProvider.jsx"


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
        <TaskProvider>
          {children}
        </TaskProvider>
      </TimerProvider>
    </SettingsProvider>
  )
}
