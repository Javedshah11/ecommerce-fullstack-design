import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
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
      const user = await signup(form)
      navigate(user.role === 'admin' ? '/admin' : '/profile', { replace: true })
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Choose user for shopping or admin for product management.</p>

        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Full name" required value={form.name} onChange={handleChange} />
          <input className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email address" required type="email" value={form.email} onChange={handleChange} />
          <input className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" minLength="6" name="password" placeholder="Password" required type="password" value={form.password} onChange={handleChange} />
          <select className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" name="role" value={form.role} onChange={handleChange}>
            <option value="user">User account</option>
            <option value="admin">Admin account</option>
          </select>
          <button className="w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-300" disabled={loading} type="submit">
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered? <Link className="font-semibold text-blue-600" to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default Signup
