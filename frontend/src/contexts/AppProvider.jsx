import { SettingsProvider } from "./settings/contextProvider"
import { TimerProvider } from "./timer/ContextProvider"


export const AppProvider = ({ children }) => {
  return (
    <SettingsProvider>
      <TimerProvider>
        {children}
      </TimerProvider>
    </SettingsProvider>
  )
}