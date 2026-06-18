export function getProductId(product) {
  return product?._id || product?.id || product?.productId
}

export function getProductName(product) {
  return product?.name || 'Product'
}
