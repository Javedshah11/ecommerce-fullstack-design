export function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode)
  let message = error.message

  if (error.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(error.errors).map((item) => item.message).join(', ')
  }

  if (error.name === 'CastError') {
    statusCode = 400
    message = error.kind === 'ObjectId' ? 'Invalid resource id' : `Invalid value for ${error.path}`
  }

  if (error.code === 11000) {
    statusCode = 409
    const field = Object.keys(error.keyPattern || error.keyValue || {})[0] || 'field'
    message = `An account with this ${field} already exists`
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'production' ? {} : { stack: error.stack }),
  })
}
