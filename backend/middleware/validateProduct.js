const requiredFields = ['name', 'price', 'image', 'description', 'category']

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== ''
}

function isNumberLike(value) {
  return hasValue(value) && Number.isFinite(Number(value))
}

function validateNumberField(body, errors, field, { min, max } = {}) {
  if (body[field] === undefined) return

  if (!isNumberLike(body[field])) {
    errors.push(`${field} must be a valid number`)
    return
  }

  const value = Number(body[field])

  if (min !== undefined && value < min) {
    errors.push(`${field} cannot be below ${min}`)
  }

  if (max !== undefined && value > max) {
    errors.push(`${field} cannot be above ${max}`)
  }
}

export function validateProduct(req, res, next) {
  const errors = []

  requiredFields.forEach((field) => {
    if (!hasValue(req.body[field])) {
      errors.push(`${field} is required`)
    }
  })

  validateNumberField(req.body, errors, 'price', { min: 0 })
  validateNumberField(req.body, errors, 'stock', { min: 0 })
  validateNumberField(req.body, errors, 'rating', { min: 0, max: 5 })

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

  validateNumberField(req.body, errors, 'price', { min: 0 })
  validateNumberField(req.body, errors, 'stock', { min: 0 })
  validateNumberField(req.body, errors, 'rating', { min: 0, max: 5 })

  if (req.body.images !== undefined && !Array.isArray(req.body.images)) {
    errors.push('images must be an array')
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(', ') })
  }

  next()
}
