import Order from '../models/Order.js'
import Product from '../models/Product.js'

function formatOrder(order) {
  const plain = order.toObject ? order.toObject() : order

  return {
    ...plain,
    id: plain._id.toString(),
  }
}

export async function createOrder(req, res) {
  const { products = [], shippingAddress = {}, delivery = 'standard' } = req.body

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Order products are required' })
  }

  const productIds = products.map((item) => item.product || item.id)
  const dbProducts = await Product.find({ _id: { $in: productIds } })
  const productMap = new Map(dbProducts.map((product) => [product._id.toString(), product]))

  const orderProducts = products.map((item) => {
    const productId = String(item.product || item.id)
    const product = productMap.get(productId)

    if (!product) {
      throw new Error(`Product not found: ${productId}`)
    }

    const quantity = Math.max(Number(item.quantity) || 1, 1)

    return {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    }
  })

  const subtotal = orderProducts.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = delivery === 'express' ? 24 : 8
  const tax = orderProducts.length ? 14 : 0

  const order = await Order.create({
    user: req.user._id,
    products: orderProducts,
    totalPrice: subtotal + shipping + tax,
    shippingAddress,
    delivery,
  })

  res.status(201).json(formatOrder(order))
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(orders.map(formatOrder))
}

export async function getAllOrders(req, res) {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })
  res.json(orders.map(formatOrder))
}

export async function updateOrderStatus(req, res) {
  const { status } = req.body
  const allowedStatuses = ['Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled']

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid order status' })
  }

  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })

  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }

  res.json(formatOrder(order))
}
