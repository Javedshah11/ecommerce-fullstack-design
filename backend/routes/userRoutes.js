import express from 'express'
import { createAdminUser, deleteUser, getUsers, updateProfile } from '../controllers/userController.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, adminOnly, asyncHandler(getUsers))
router.post('/admin', protect, adminOnly, asyncHandler(createAdminUser))
router.put('/profile', protect, asyncHandler(updateProfile))
router.delete('/:id', protect, adminOnly, asyncHandler(deleteUser))

export default router
