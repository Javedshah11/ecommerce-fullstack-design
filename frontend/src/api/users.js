import api from './axios'

export async function getUsers(params = {}) {
  const { data } = await api.get('/users', { params })
  return data
}

export async function updateProfile(payload) {
  const { data } = await api.put('/users/profile', payload)
  return data
}

export async function createAdminUser(payload) {
  const { data } = await api.post('/users/admin', payload)
  return data
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`)
  return data
}
