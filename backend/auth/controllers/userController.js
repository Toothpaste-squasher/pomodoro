import ms from 'ms';
import bcrypt from 'bcryptjs';

import { loginSignTokens } from './helpers/signToken.js';
import { pool } from '../../db/db.js';



export const register = async (req, res) => {
  const sql = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`
  const { username, email, password } = req.body
  const password_hash = await bcrypt.hash(password, 10) // 10 being the salt

  await pool.query(sql, [username, email, password_hash])
  res.status(200).json({ success: true })
  /*
  const { username, email, password } = req.body
  const findUser = users.find(user => user.username === username)
  const findEmail = users.find(user => user.email === email)
  if (findUser) {
    return res.status(401).json({ success: false, message: 'Username already exists' })
  } else if (findEmail) {
    return res.status(401).json({ success: false, message: 'Email already used' })
  } else {
    users.push({ username, email, password })
    res.json({ success: true, message: 'User created successfully' })
  }
  */
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

  /*
  const user = users.find(user => user.username === req.body.username && user.password === req.body.password)
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  // filter out password to not be included in the tokens
  const { password, ...payload } = user

  const { accessToken, refreshToken, rTokenExpiry } = loginSignTokens(payload, res)
  // Set refresh token to cookies
  res.cookie('jwrt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: ms(rTokenExpiry)
  })
  // Send access token
  res.json({ success: true, accessToken });
  */
}
