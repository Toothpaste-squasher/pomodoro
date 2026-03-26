import { pool } from "../../db/db.js";

export const getSettings = async (req, res) => {
  const sql = `SELECT * FROM settings WHERE user_id = ?`

  const [userSettings] = await pool.query(sql, [req.user.id])

  if (!userSettings || userSettings.length === 0) {
    const insertSql = `INSERT INTO settings (user_id) VALUES (?)`;
    await pool.query(insertSql, [req.user.id]);

    const [newSettings] = await pool.query(sql, [req.user.id]);
    return res.status(200).json({ success: true, data: newSettings[0] })
  }
  res.status(200).json({ success: true, data: userSettings[0] })
}

export const updateSettings = async (req, res) => {
  const sql = `UPDATE settings SET ?? = ? WHERE user_id = ?`
  const [column] = Object.keys(req.body)
  const value = req.body[column];

  await pool.query(sql, [column, value, req.user.id])
  res.status(200).json({ success: true, data: { [column]: value } })
}