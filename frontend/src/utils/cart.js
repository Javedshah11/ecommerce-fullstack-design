const CART_KEY = 'ecommerce_cart'

export function getCartItems() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY)) || []
    return items
      .map((item) => ({
        productId: item.productId || item._id || item.id,
        quantity: Number(item.quantity) || 1,
      }))
      .filter((item) => item.productId)
  } catch {
    return []
  }
}

export function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}
