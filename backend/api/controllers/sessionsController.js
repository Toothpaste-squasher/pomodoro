import { pool } from '../../db/db.js';

export const createSesh = async (req, res) => {
  const sql = `INSERT INTO sessions (user_id, session_type, end_time, duration_s) VALUES (?, ?, ?, ?)`
  const { session_type, end_time, duration_s } = req.body.newSesh
  const user_id = req.user.user_id
  await pool.execute(sql, [user_id, session_type, end_time, duration_s])
  res.status(200).json({ success: true, message: `Added new session: ${session_type}, ${end_time}, ${duration_s}` })
}

export const getStudySesh = async (req, res) => {
  const sql = `SELECT * FROM sessions WHERE user_id = ?`
  const user_id = req.user.user_id;
  const [row] = await pool.execute(sql, [user_id])
  res.status(200).json({ success: true, data: row })
}


