import jwt from 'jsonwebtoken';


// Constants
const aTokenExpiry = '10m';
const rTokenExpiry = '7d';


export const signAToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_S, { expiresIn: aTokenExpiry })
}

export const signRToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_S, { expiresIn: rTokenExpiry })
}

export const loginSignTokens = (fullPayload) => {
  const _id = fullPayload.id;

  const accessToken = signAToken(fullPayload);
  const refreshToken = signRToken({ id: _id });

  return { accessToken, refreshToken, rTokenExpiry }
}