import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
      index: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: String,
      default: 'Free Shipping',
    },
    supplier: {
      type: String,
      default: 'Brand Supply Co.',
    },
    location: {
      type: String,
      default: 'United States',
    },
    verified: {
      type: Boolean,
      default: true,
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model('Product', productSchema)

export default Product
