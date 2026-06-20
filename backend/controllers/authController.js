import crypto from 'crypto'
import User from '../models/User.js'
import { sendPasswordResetEmail } from '../utils/email.js'
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
  const { name, email, password } = req.body

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
    role: 'user',
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

export async function forgotPassword(req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  const user = await User.findOne({ email })

  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex')
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000)
    await user.save()

    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?email=${encodeURIComponent(user.email)}&token=${rawToken}`

    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    })
  }

  res.json({
    message: 'If an account exists, reset instructions will be sent.',
  })
}

export async function resetPassword(req, res) {
  const { email, password, token } = req.body

  if (!email || !password || !token) {
    return res.status(400).json({ message: 'Email, reset token, and new password are required' })
  }

  if (String(password).length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    email,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  })

  if (!user) {
    return res.status(400).json({ message: 'Reset link is invalid or expired' })
  }

  user.setPassword(password)
  user.resetPasswordToken = ''
  user.resetPasswordExpires = null
  await user.save()

  res.json({ message: 'Password reset successfully' })
}
