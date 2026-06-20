import express from 'express'
import { getAdminStats } from '../controllers/adminController.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/stats', protect, adminOnly, asyncHandler(getAdminStats))

export default router
