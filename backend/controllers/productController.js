import mongoose from 'mongoose'
import {
  createProduct as createProductService,
  deleteProduct as deleteProductService,
  findFeaturedProducts,
  findProductById,
  findProducts,
  updateProduct as updateProductService,
} from '../services/productService.js'

function isInvalidObjectId(id) {
  return !mongoose.Types.ObjectId.isValid(id)
}

export async function getProducts(req, res) {
  const products = await findProducts(req.query)
  res.json(products)
}

export async function getFeaturedProducts(req, res) {
  const products = await findFeaturedProducts()
  res.json(products)
}

export async function getProductById(req, res) {
  if (isInvalidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  const product = await findProductById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
}

export async function createProduct(req, res) {
  const product = await createProductService(req.body)
  res.status(201).json(product)
}

export async function updateProduct(req, res) {
  if (isInvalidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  const product = await updateProductService(req.params.id, req.body)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
}

export async function deleteProduct(req, res) {
  if (isInvalidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  const product = await deleteProductService(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json({ message: 'Product deleted successfully' })
}
