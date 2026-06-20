import api from './axios'

export async function loginUser(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

export async function signupUser(payload) {
  const { data } = await api.post('/auth/signup', payload)
  return data
}

export async function getCurrentUser() {
  const { data } = await api.get('/auth/me')
  return data
}

export async function forgotPassword(email) {
  const { data } = await api.post('/auth/forgot-password', { email })
  return data
}

export async function resetPassword(payload) {
  const { data } = await api.post('/auth/reset-password', payload)
  return data
}
