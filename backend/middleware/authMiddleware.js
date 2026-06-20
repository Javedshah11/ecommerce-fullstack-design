import User from '../models/User.js'
import { verifyJwt } from '../utils/jwt.js'

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' })
  }

  try {
    const payload = verifyJwt(token)
    const user = await User.findById(payload.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' })
    }

    req.user = user
    next()
  } catch {
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }

  next()
}
