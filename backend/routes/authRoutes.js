import express from 'express'
import { forgotPassword, getMe, login, resetPassword, signup } from '../controllers/authController.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', asyncHandler(signup))
router.post('/login', asyncHandler(login))
router.post('/forgot-password', asyncHandler(forgotPassword))
router.post('/reset-password', asyncHandler(resetPassword))
router.get('/me', protect, asyncHandler(getMe))

export default router
