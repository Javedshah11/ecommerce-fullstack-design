import Order from '../models/Order.js'
import Product from '../models/Product.js'

const DELIVERY_OPTIONS = ['standard', 'express']

function formatOrder(order) {
  const plain = order.toObject ? order.toObject() : order

  return {
    ...plain,
    id: plain._id.toString(),
  }
}

export async function createOrder(req, res) {
  const { products = [], shippingAddress = {}, delivery = 'standard' } = req.body

  if (!DELIVERY_OPTIONS.includes(delivery)) {
    return res.status(400).json({ message: 'Invalid delivery method' })
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Order products are required' })
  }

  const productIds = products.map((item) => item.product || item.id).filter(Boolean)

  if (productIds.length !== products.length) {
    return res.status(400).json({ message: 'Each order item must include a product id' })
  }

  const dbProducts = await Product.find({ _id: { $in: productIds } })
  const productMap = new Map(dbProducts.map((product) => [product._id.toString(), product]))

  const orderProducts = products.map((item) => {
    const productId = String(item.product || item.id)
    const product = productMap.get(productId)

    if (!product) {
      const error = new Error(`Product not found: ${productId}`)
      error.statusCode = 404
      throw error
    }

    const quantity = Number(item.quantity)

    if (!Number.isInteger(quantity) || quantity < 1) {
      const error = new Error(`Invalid quantity for ${product.name}`)
      error.statusCode = 400
      throw error
    }

    if (product.stock < quantity) {
      const error = new Error(`${product.name} has only ${product.stock} units available`)
      error.statusCode = 400
      throw error
    }

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

  const decrementedItems = []
  let order

  try {
    for (const item of orderProducts) {
      const result = await Product.updateOne(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
      )

      if (result.modifiedCount !== 1) {
        const error = new Error(`${item.name} no longer has enough stock`)
        error.statusCode = 400
        throw error
      }

      decrementedItems.push(item)
    }

    order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice: subtotal + shipping + tax,
      shippingAddress,
      delivery,
    })
  } catch (error) {
    await Promise.all(
      decrementedItems.map((item) =>
        Product.updateOne(
          { _id: item.product },
          { $inc: { stock: item.quantity } },
        ),
      ),
    )

    throw error
  }

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
