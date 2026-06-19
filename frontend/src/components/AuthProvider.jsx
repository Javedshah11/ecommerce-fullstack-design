import { useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser, signupUser } from '../api/auth'
import api from '../api/axios'
import AuthContext from '../context/AuthContext'
import { clearStoredAuth, getStoredAuth, saveStoredAuth } from '../utils/auth'

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredAuth().user)
  const [token, setToken] = useState(() => getStoredAuth().token)
  const [loading, setLoading] = useState(Boolean(getStoredAuth().token))
  const [toast, setToast] = useState('')

  useEffect(() => {
    api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''
  }, [token])

  useEffect(() => {
    let isActive = true

    async function hydrateUser() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await getCurrentUser()
        if (!isActive) return
        setUser(data.user)
        saveStoredAuth({ user: data.user, token })
      } catch {
        if (!isActive) return
        setUser(null)
        setToken('')
        clearStoredAuth()
      } finally {
        if (isActive) setLoading(false)
      }
    }

    hydrateUser()

    return () => {
      isActive = false
    }
  }, [token])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(timeout)
  }, [toast])

  async function login(credentials) {
    const data = await loginUser(credentials)
    setUser(data.user)
    setToken(data.token)
    saveStoredAuth(data)
    setToast(`Welcome back, ${data.user.name}.`)
    return data.user
  }

  async function signup(payload) {
    const data = await signupUser(payload)
    setUser(data.user)
    setToken(data.token)
    saveStoredAuth(data)
    setToast(`Account created for ${data.user.name}.`)
    return data.user
  }

  function logout() {
    setUser(null)
    setToken('')
    clearStoredAuth()
    delete api.defaults.headers.common.Authorization
    setToast('Logged out successfully.')
  }

  const value = useMemo(() => ({
    user,
    token,
    loading,
    toast,
    isAuthenticated: Boolean(user && token),
    isAdmin: user?.role === 'admin',
    login,
    signup,
    logout,
  }), [user, token, loading, toast])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
