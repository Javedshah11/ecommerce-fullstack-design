import crypto from 'crypto'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    passwordSalt: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordSalt = crypto.randomBytes(16).toString('hex')
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 120000, 64, 'sha512')
    .toString('hex')
}

userSchema.methods.matchPassword = function matchPassword(password) {
  const candidateHash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 120000, 64, 'sha512')
    .toString('hex')

  return crypto.timingSafeEqual(Buffer.from(candidateHash), Buffer.from(this.passwordHash))
}

userSchema.virtual('id').get(function getId() {
  return this._id.toString()
})

const User = mongoose.model('User', userSchema)

export default User
