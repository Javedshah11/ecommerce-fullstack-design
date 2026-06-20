import bcrypt from 'bcrypt'
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resetPasswordToken: {
      type: String,
      default: '',
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

userSchema.methods.setPassword = function setPassword(password) {
  this.password = bcrypt.hashSync(password, 12)
}

userSchema.methods.matchPassword = function matchPassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.virtual('id').get(function getId() {
  return this._id.toString()
})

const User = mongoose.model('User', userSchema)

export default User
