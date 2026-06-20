import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await login(form)
      const fallback = user.role === 'admin' ? '/admin' : '/profile'
      navigate(location.state?.from?.pathname || fallback, { replace: true })
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-1 text-sm text-slate-500">Access your account and admin tools.</p>

        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email address" required type="email" value={form.email} onChange={handleChange} />
          <div className="flex rounded-md border border-slate-200">
            <input className="min-w-0 flex-1 px-4 py-3 text-sm outline-none" name="password" placeholder="Password" required type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} />
            <button className="px-4 text-sm font-semibold text-blue-600" type="button" onClick={() => setShowPassword((current) => !current)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-300" disabled={loading} type="submit">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          New here? <Link className="font-semibold text-blue-600" to="/signup">Create an account</Link>
        </p>
        <Link className="mt-3 block text-center text-sm font-semibold text-blue-600" to="/forgot-password">Forgot password?</Link>
      </section>
    </main>
  )
}

export default Login
