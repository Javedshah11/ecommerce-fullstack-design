import express from 'express'
import { createOrder, getAllOrders, getMyOrders, updateOrderStatus } from '../controllers/orderController.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, asyncHandler(createOrder))
router.get('/my', protect, asyncHandler(getMyOrders))
router.get('/admin', protect, adminOnly, asyncHandler(getAllOrders))
router.put('/:id/status', protect, adminOnly, asyncHandler(updateOrderStatus))

export default router
