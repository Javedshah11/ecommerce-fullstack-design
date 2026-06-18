const CART_KEY = 'ecommerce_cart'

export function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  } catch {
    return []
  }
}

export function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function addToCart(product) {
  const productId = product._id || product.id
  const currentItems = getCartItems()
  const existingItem = currentItems.find((item) => (item._id || item.id) === productId)
  const nextItems = existingItem
    ? currentItems.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    : [...currentItems, { ...product, quantity: 1 }]

  saveCartItems(nextItems)
  return nextItems
}
