import express from 'express'
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { validateProduct, validateProductUpdate } from '../middleware/validateProduct.js'

const router = express.Router()

router.route('/').get(asyncHandler(getProducts)).post(validateProduct, asyncHandler(createProduct))
router.get('/featured', asyncHandler(getFeaturedProducts))
router
  .route('/:id')
  .get(asyncHandler(getProductById))
  .put(validateProductUpdate, asyncHandler(updateProduct))
  .delete(asyncHandler(deleteProduct))

export default router
