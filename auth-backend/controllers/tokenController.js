import jwt from 'jsonwebtoken';

import { signAToken } from './helpers/signToken.js';
import { users } from '../data/users.js';

export const refreshToken = (req, res) => {
  const rToken = req.cookies.jwrt;

  if (!rToken) return res.status(401).json({ message: 'No refresh token found' })

  jwt.verify(rToken, process.env.REFRESH_TOKEN_S, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token', err: err.message })
    }
    const { id } = decoded
    const user = users.find(user => user.id === id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const { password, ...payload } = user

    const newAToken = signAToken(payload)
    res.json({ token: newAToken })
  })
}
