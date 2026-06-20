import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../api/auth'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    email: searchParams.get('email') || '',
    token: searchParams.get('token') || '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const data = await resetPassword(form)
      setMessage(data.message)
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Password could not be reset.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Reset password</h1>
        <p className="mt-1 text-sm text-slate-500">Set a new password for your account.</p>
        {message && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</p>}
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email address" required type="email" value={form.email} onChange={handleChange} />
          <input className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" name="token" placeholder="Reset token" required value={form.token} onChange={handleChange} />
          <div className="flex rounded-md border border-slate-200">
            <input className="min-w-0 flex-1 px-4 py-3 text-sm outline-none" minLength="6" name="password" placeholder="New password" required type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} />
            <button className="px-4 text-sm font-semibold text-blue-600" type="button" onClick={() => setShowPassword((current) => !current)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-300" disabled={loading} type="submit">
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
        <Link className="mt-5 block text-center text-sm font-semibold text-blue-600" to="/login">Back to login</Link>
      </section>
    </main>
  )
}

export default ResetPassword
