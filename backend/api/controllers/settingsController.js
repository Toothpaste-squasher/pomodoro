import { pool } from "../../db/db.js";
import { settingsAC } from "../data/allowedColumns.js";

export const getSettings = async (req, res) => {
  const sql = `SELECT * FROM settings WHERE user_id = ?`

  console.log(req.user)
  const [userSettings] = await pool.execute(sql, [req.user.id])

  if (!userSettings || userSettings.length === 0) {
    const insertSql = `INSERT INTO settings (user_id) VALUES (?)`;
    await pool.execute(insertSql, [req.user.id]);

    const [newSettings] = await pool.execute(sql, [req.user.id]);
    return res.status(200).json({ success: true, data: newSettings[0] })
  }
  res.status(200).json({ success: true, data: userSettings[0] })
}

export const updateSettings = async (req, res) => {
  const [column] = Object.keys(req.body)
  const value = req.body[column];

  if (!settingsAC.includes(column)) {
    return res.status(400).json({ success: false, message: "Invalid setting field" });
  }

  const sql = `UPDATE settings SET ${column} = ? WHERE user_id = ?`
  await pool.execute(sql, [value, req.user.id])
  res.status(200).json({ success: true, data: { [column]: value } })
}