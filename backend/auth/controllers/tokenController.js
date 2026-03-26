import jwt from 'jsonwebtoken';
import { pool } from '../../db/db.js';

import { signAToken } from './helpers/signToken.js';

export const refreshToken = (req, res) => {
  const rToken = req.cookies.jwrt;

  if (!rToken) return res.status(401).json({ message: 'No refresh token found' })

  jwt.verify(rToken, process.env.REFRESH_TOKEN_S, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token', err: err.message })
    }

    const { id } = decoded;
    const sql = `SELECT * FROM users WHERE id = ?`
    const [user_info] = await pool.execute(sql, [id])
    if (user_info.length <= 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { password_hash, ...payload } = user_info[0];

    const newAToken = signAToken(payload)
    res.json({ token: newAToken })
  })
}
