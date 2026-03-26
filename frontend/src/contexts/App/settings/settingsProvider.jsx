import { useLayoutEffect, useState, useContext, useMemo, useReducer } from "react";
import { SettingsContext, SettingsDispatchContext } from "./settingsContext";

import useSettingsService from "../../../hooks/services/settingsService";

const SettingsProvider = ({ children }) => {
  const { getSettings, updateSetting } = useSettingsService();
  const [settings, dispatchSettings] = useReducer(settingsReducer, {
    theme: 'light',
    focus_dur: 1500000,
    break_dur: 300000,
    show_timer_in_tab: true,
  })

  function settingsReducer(state, action) {
    switch (action.type) {
      case 'FETCH':
        return action.payload
      case 'ALTER':
        return { ...state, [action.payload.name]: action.payload.value }
      default:
        return state
    }
  }

  const handleFetchSettings = async () => {
    try {
      const fetchedSettings = await getSettings()
      dispatchSettings({ type: 'FETCH', payload: fetchedSettings })
    } catch (err) {
      console.error("Error fetching settings:", err)
    }
  }


  const handleAlterSettings = async (name, value) => {
    try {
      await updateSetting(name, value)
      dispatchSettings({ type: 'ALTER', payload: { name, value } })
    } catch (err) {
      console.error("Error updating settings:", err)
    }
  }

  useLayoutEffect(() => {
    handleFetchSettings()
  }, [])

  const dispatchValues = useMemo(() => ({
    handleFetchSettings,
    handleAlterSettings
  }), [dispatchSettings])

  return (
    <SettingsContext.Provider value={{ settings }}>
      <SettingsDispatchContext.Provider value={dispatchValues}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;