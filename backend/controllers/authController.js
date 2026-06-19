import User from '../models/User.js'
import { signJwt } from '../utils/jwt.js'

function formatUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

function sendAuthResponse(res, user, statusCode = 200) {
  res.status(statusCode).json({
    user: formatUser(user),
    token: signJwt({ id: user._id.toString(), role: user.role }),
  })
}

export async function signup(req, res) {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }

  if (String(password).length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists' })
  }

  const user = new User({
    name,
    email,
    role: role === 'admin' ? 'admin' : 'user',
  })
  user.setPassword(password)
  await user.save()

  sendAuthResponse(res, user, 201)
}

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await User.findOne({ email })

  if (!user || !user.matchPassword(password)) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  sendAuthResponse(res, user)
}

export async function getMe(req, res) {
  res.json({ user: formatUser(req.user) })
}
