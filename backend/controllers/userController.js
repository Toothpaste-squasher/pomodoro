import { users } from '../data/users.js';
import jwt from 'jsonwebtoken';


export const register = (req, res) => {

}

export const login = (req, res) => {
  const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)

  res.json({ accessToken })
}