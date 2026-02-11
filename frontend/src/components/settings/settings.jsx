import { React, useState, useContext } from "react"
import { settingsContext } from "../../contexts/settings/settingsContext";

import useSettingsService from "../../hooks/services/settingsService";


export const Settings = () => {
  const { theme, setTheme, defaultDur, setDefaultDur } = useContext(settingsContext);
  const { updateSetting } = useSettingsService();

  return (
    <div className="settings-page">
      <button
        onClick={(e) => {
          setTheme(e.target.value)
          updateSetting('theme', e.target.value)
        }}
        value={theme === 'light' ? 'dark' : 'light'}
      >
        {theme === 'light' ? 'dark' : 'light'}
      </button>

      <label htmlFor="defaultDur">Default Duration</label>
      <input
        type="number"
        value={defaultDur}
        onChange={e => {
          setDefaultDur(e.target.value)
          updateSetting('defaultDur', e.target.value)
        }}
      />
    </div>
  )
}