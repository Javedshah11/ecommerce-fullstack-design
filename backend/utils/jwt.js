import jwt from 'jsonwebtoken'

export function signJwt(payload, expiresIn = '7d') {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required')
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

export function verifyJwt(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required')
  }

  return jwt.verify(token, process.env.JWT_SECRET)
}
