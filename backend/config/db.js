import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerceDB'

async function connectDB() {
  try {
    const connection = await mongoose.connect(MONGO_URI)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
