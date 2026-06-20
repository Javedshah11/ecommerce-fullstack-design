import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

export async function getAdminStats(req, res) {
  const [totalProducts, totalUsers, totalOrders, revenueResult] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, revenue: { $sum: '$totalPrice' } } },
    ]),
  ])

  res.json({
    totalProducts,
    totalUsers,
    totalOrders,
    revenue: revenueResult[0]?.revenue || 0,
  })
}
