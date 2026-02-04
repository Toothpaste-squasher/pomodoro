import { useEffect, useState } from "react";
import { settingsContext } from "./settingsContext";

import { getSettings } from "../../services/settingsService";

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [defaultDur, setDefaultDur] = useState(0);

  useEffect(() => {
    getSettings().then((res) => {
      setTheme(res.data[0].theme);
      setDefaultDur(Number(res.data[0].defaultDur));
    })
  }, [])

  return (
    <settingsContext.Provider
      value={{
        theme,
        setTheme,
        defaultDur,
        setDefaultDur
      }}
    >
      {children}
    </settingsContext.Provider>
  )
}