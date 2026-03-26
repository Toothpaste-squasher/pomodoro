import ms from 'ms';
import bcrypt from 'bcryptjs';

import { loginSignTokens } from './helpers/signToken.js';
import { pool } from '../../db/db.js';



export const register = async (req, res) => {
  const sql = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`
  const { username, email, password } = req.body
  const password_hash = await bcrypt.hash(password, 10) // 10 being the salt

  const [result] = await pool.query(sql, [username, email, password_hash])
  
  const settingsSql = `INSERT INTO settings (user_id) VALUES (?)`
  await pool.query(settingsSql, [result.insertId])

  res.status(200).json({ success: true })
}

export const login = async (req, res) => {
  const sql = `SELECT * FROM users WHERE email = ? AND password_hash = ?`
  const { email, password } = req.body;
  const [rows] = await pool.query(sql, [email, password])

  if (rows.length <= 0) {
    res.status(400).json({ success: false, message: 'invalid email or password' })
  }

  const { password_hash, ...payload } = rows[0];
  const { accessToken, refreshToken, rTokenExpiry } = loginSignTokens(payload)
  // Set refresh token to cookies
  await res.cookie('jwrt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: ms(rTokenExpiry)
  })
  // Send access token
  res.status(200).json({ success: true, accessToken });
}
