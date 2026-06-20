import api from './axios'

export async function createOrder(payload) {
  const { data } = await api.post('/orders', payload)
  return data
}

export async function getMyOrders() {
  const { data } = await api.get('/orders/my')
  return data
}

export async function getAdminOrders() {
  const { data } = await api.get('/orders/admin')
  return data
}

export async function updateOrderStatus(id, status) {
  const { data } = await api.put(`/orders/${id}/status`, { status })
  return data
}
