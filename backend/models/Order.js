import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    products: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator(items) {
          return items.length > 0
        },
        message: 'Order must include at least one product',
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      city: String,
      address: String,
    },
    delivery: {
      type: String,
      default: 'standard',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Order = mongoose.model('Order', orderSchema)

export default Order
