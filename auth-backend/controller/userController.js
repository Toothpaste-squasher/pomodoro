import { users } from '../data/users.js';
import jwt from 'jsonwebtoken';


export const register = (req, res) => {
  const { username, email, password } = req.body
  const findUser = users.find(user => user.username === username)
  const findEmail = users.find(user => user.email === email)
  if (findUser) {
    return res.status(401).json({ message: 'Username already exists' })
  } else if (findEmail) {
    return res.status(401).json({ message: 'Email already used' })
  } else {
    users.push({ username, email, password })
    res.json({ message: 'User created successfully' })
  }
}

export const login = (req, res) => {
  const { username, password } = req.body
  const user = users.find(user => user.username === username && user.password === password)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const info = { name: username }
  const accessToken = jwt.sign(info, process.env.ACCESS_TOKEN)
  res.json({ accessToken })
}


