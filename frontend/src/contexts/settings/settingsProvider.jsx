import { useEffect, useState } from "react";
import { settingsContext } from "./settingsContext";

import useSettingsService from "../../hooks/services/settingsService";

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [defaultDur, setDefaultDur] = useState(0);
  const { getSettings } = useSettingsService();

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