import { users } from '../data/users.js';

import { loginSignTokens, signAToken, signRToken } from './helpers/signToken.js';



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
  const user = users.find(user => user.username === req.body.username && user.password === req.body.password)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const { password, ...payload } = user      // filter out password to not be included in the tokens
  loginSignTokens(payload, res)

}


