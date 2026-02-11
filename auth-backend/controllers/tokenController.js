import jwt from 'jsonwebtoken';

import { signAToken } from './helpers/signToken.js';


export const refreshToken = (req, res) => {
  const rToken = req.cookies.jwrt;

  if (!rToken) return res.status(401).json({ message: 'No refresh token found' })

  jwt.verify(rToken, process.env.REFRESH_TOKEN_S, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token', err: err.message })
    }
    const newAToken = signAToken(payload)
    res.json({ newAToken })
  })
}
