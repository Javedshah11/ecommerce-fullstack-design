const requiredFields = ['name', 'price', 'image', 'description', 'category']

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== ''
}

export function validateProduct(req, res, next) {
  const errors = []

  requiredFields.forEach((field) => {
    if (!hasValue(req.body[field])) {
      errors.push(`${field} is required`)
    }
  })

  if (req.body.price !== undefined && Number(req.body.price) < 0) {
    errors.push('price cannot be negative')
  }

  if (req.body.stock !== undefined && Number(req.body.stock) < 0) {
    errors.push('stock cannot be negative')
  }

  if (req.body.rating !== undefined && (Number(req.body.rating) < 0 || Number(req.body.rating) > 5)) {
    errors.push('rating must be between 0 and 5')
  }

  if (req.body.images !== undefined && !Array.isArray(req.body.images)) {
    errors.push('images must be an array')
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(', ') })
  }

  next()
}

export function validateProductUpdate(req, res, next) {
  const errors = []

  if (req.body.price !== undefined && Number(req.body.price) < 0) {
    errors.push('price cannot be negative')
  }

  if (req.body.stock !== undefined && Number(req.body.stock) < 0) {
    errors.push('stock cannot be negative')
  }

  if (req.body.rating !== undefined && (Number(req.body.rating) < 0 || Number(req.body.rating) > 5)) {
    errors.push('rating must be between 0 and 5')
  }

  if (req.body.images !== undefined && !Array.isArray(req.body.images)) {
    errors.push('images must be an array')
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(', ') })
  }

  next()
}
