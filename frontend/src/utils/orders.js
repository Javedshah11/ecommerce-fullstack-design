const ORDERS_KEY = 'ecommerce_orders'

export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []
  } catch {
    return []
  }
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function addOrder(order) {
  const nextOrders = [order, ...getOrders()]
  saveOrders(nextOrders)
  return nextOrders
}
