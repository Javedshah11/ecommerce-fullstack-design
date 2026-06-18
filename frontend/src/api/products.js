import api from './axios'

export async function getProducts(params = {}) {
  const { data } = await api.get('/products', { params })
  return data
}

export async function getFeaturedProducts() {
  const { data } = await api.get('/products/featured')
  return data
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}
