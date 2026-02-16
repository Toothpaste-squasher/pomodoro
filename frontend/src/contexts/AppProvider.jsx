import { SettingsProvider } from "./settings/settingsProvider"
import { TimerProvider } from "./timer/timerProvider"


export const AppProvider = ({ children }) => {
  return (
    <SettingsProvider>
      <TimerProvider>
        {children}
      </TimerProvider>
    </SettingsProvider>
  )
}