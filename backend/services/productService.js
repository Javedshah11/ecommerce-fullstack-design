import Product from '../models/Product.js'

const SORT_OPTIONS = {
  'price-low': { price: 1 },
  'price-high': { price: -1 },
  newest: { _id: -1 },
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildFilters(query) {
  const { search, category, featured } = query
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

  return filters
}

export function getStockStatus(stock) {
  if (stock <= 0) return 'outOfStock'
  if (stock <= 5) return 'lowStock'
  return 'inStock'
}

function formatProduct(product) {
  const plainProduct = product.toObject ? product.toObject() : product

  return {
    ...plainProduct,
    stockStatus: getStockStatus(plainProduct.stock),
  }
}

function getProductPayload(body) {
  const allowedFields = ['name', 'price', 'image', 'images', 'description', 'category', 'stock', 'featured', 'rating', 'reviews']

  return allowedFields.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field]
    }

    return payload
  }, {})
}

export async function findProducts(query) {
  const filters = buildFilters(query)
  const page = Math.max(Number(query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(query.limit) || 8, 1), 50)
  const sort = SORT_OPTIONS[query.sort] || SORT_OPTIONS.newest
  const skip = (page - 1) * limit

  const [products, totalProducts] = await Promise.all([
    Product.find(filters).sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filters),
  ])

  return {
    products: products.map(formatProduct),
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit) || 1,
      showing: products.length,
    },
  }
}

export async function findFeaturedProducts() {
  const products = await Product.find({ featured: true }).sort({ _id: -1 }).limit(8)
  return products.map(formatProduct)
}

export async function findProductById(id) {
  const product = await Product.findById(id)
  return product ? formatProduct(product) : null
}

export async function createProduct(body) {
  const product = await Product.create(getProductPayload(body))
  return formatProduct(product)
}

export async function updateProduct(id, body) {
  const product = await Product.findByIdAndUpdate(id, getProductPayload(body), {
    new: true,
    runValidators: true,
  })

  return product ? formatProduct(product) : null
}

export async function deleteProduct(id) {
  return Product.findByIdAndDelete(id)
}
