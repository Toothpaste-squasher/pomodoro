import { React, useState, useContext } from "react"
import { SettingsContext, SettingsDispatchContext } from "../../contexts/app/settings/settingsContext";


export const Settings = () => {
  const { settings } = useContext(SettingsContext);
  const { handleAlterSettings } = useContext(SettingsDispatchContext);

  console.log(settings)

  return (
    <div className="settings-page">
      <button
        onClick={(e) => {
          handleAlterSettings('theme', e.target.value)
        }}
        value={settings.theme === 'light' ? 'dark' : 'light'}
      >
        {settings.theme === 'light' ? 'dark' : 'light'}
      </button>

      <label htmlFor="defaultDur">Focus duration</label>
      <input
        type="number"
        value={settings.focus_dur}
        onChange={e => {
          handleAlterSettings('focus_dur', e.target.value)
        }}
      />

      <label htmlFor="break_dur">Break duration</label>
      <input
        type="number"
        value={settings.break_dur}
        onChange={e => {
          handleAlterSettings('break_dur', e.target.value)
        }}
      />
    </div>
  )
}