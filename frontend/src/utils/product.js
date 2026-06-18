export function getProductId(product) {
  return product?._id || product?.id
}

export function getProductName(product) {
  return product?.name || product?.title || 'Product'
}

export function getProductOldPrice(product) {
  return product?.oldPrice || Math.round((product?.price || 0) * 1.18)
}

export function getProductSpecs(product) {
  return product?.specs || {}
}
