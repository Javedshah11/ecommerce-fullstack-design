const AUTH_KEY = 'ecommerce_auth'

export function getStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY)) || { user: null, token: '' }
  } catch {
    return { user: null, token: '' }
  }
}

export function saveStoredAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_KEY)
}
