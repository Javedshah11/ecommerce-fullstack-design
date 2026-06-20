import User from '../models/User.js'

function formatUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  }
}

export async function getUsers(req, res) {
  const search = req.query.search?.trim()
  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      }
    : {}
  const users = await User.find(filter).select('-password').sort({ createdAt: -1 })
  res.json(users.map(formatUser))
}

export async function createAdminUser(req, res) {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }

  if (String(password).length < 8) {
    return res.status(400).json({ message: 'Admin password must be at least 8 characters' })
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists' })
  }

  const user = new User({
    name,
    email,
    role: 'admin',
  })
  user.setPassword(password)
  await user.save()

  res.status(201).json({ user: formatUser(user) })
}

export async function updateProfile(req, res) {
  const allowedFields = ['name', 'email']
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      req.user[field] = req.body[field]
    }
  })

  await req.user.save()
  res.json({ user: formatUser(req.user) })
}

export async function deleteUser(req, res) {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ message: 'You cannot delete your own admin account' })
  }

  const user = await User.findByIdAndDelete(req.params.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json({ message: 'User deleted successfully' })
}
