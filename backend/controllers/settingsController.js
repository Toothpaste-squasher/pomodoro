import settings from "../data/settings.js";

export const getSettings = (req, res) => {
  res.status(200).json(settings);
}

export const updateSettings = (req, res) => {
  const userId = Number(req.params.id);
  const settingValue = req.body;

  const index = settings.findIndex((user) => user.userId === userId);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  settings[index] = { ...settings[index], ...settingValue };
  return res.status(200).json(settings[index]);
}