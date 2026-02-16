import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    console.log("No token attached")
    return res.status(401).send('access denied')
  } // No token
  jwt.verify(token, process.env.ACCESS_TOKEN_S, (err, user) => {
    if (err) {
      console.log("Invalid token")
      return res.status(403).send('invalid access token') // Invalid token
    }
    req.user = user
    next()
  })
}
