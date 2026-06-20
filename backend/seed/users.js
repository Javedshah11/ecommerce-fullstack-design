import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import connectDB from '../config/db.js'
import User from '../models/User.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env') })

const demoUsers = [
  {
    name: 'MarketPro Admin',
    email: 'admin@openhouse.com',
    password: 'admin1234',
    role: 'admin',
  },
  {
    name: 'MarketPro User',
    email: 'user@openhouse.com',
    password: 'user1234',
    role: 'user',
  },
]

async function seedUsers() {
  await connectDB()

  await Promise.all(demoUsers.map(async (demoUser) => {
    const user = await User.findOne({ email: demoUser.email })
    const targetUser = user || new User({ email: demoUser.email })

    targetUser.name = demoUser.name
    targetUser.role = demoUser.role
    targetUser.setPassword(demoUser.password)

    await targetUser.save()
  }))

  console.log(`${demoUsers.length} demo users seeded`)
  process.exit()
}

seedUsers().catch((error) => {
  console.error(error)
  process.exit(1)
})
