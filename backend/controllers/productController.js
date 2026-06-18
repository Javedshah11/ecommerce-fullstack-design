import mongoose from 'mongoose'
import Product from '../models/Product.js'

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function getProducts(req, res) {
  const { search, category, featured } = req.query
  const filters = {}

  if (search) {
    const searchRegex = escapeRegex(search)
    filters.$or = [
      { name: { $regex: searchRegex, $options: 'i' } },
      { description: { $regex: searchRegex, $options: 'i' } },
      { category: { $regex: searchRegex, $options: 'i' } },
    ]
  }

  if (category) {
    filters.category = { $regex: escapeRegex(category), $options: 'i' }
  }

  if (featured !== undefined) {
    filters.featured = featured === 'true'
  }

  const products = await Product.find(filters).sort({ createdAt: -1 })
  res.json(products)
}

export async function getProductById(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body)
  res.status(201).json(product)
}

export async function updateProduct(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
}

export async function deleteProduct(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json({ message: 'Product deleted successfully' })
}
