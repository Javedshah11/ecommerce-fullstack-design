import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../api/auth'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const data = await forgotPassword(email)
      setMessage(data.message)
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Reset request failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Forgot password</h1>
        <p className="mt-1 text-sm text-slate-500">Enter your account email to start password reset.</p>
        {message && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</p>}
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm" placeholder="Email address" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <button className="w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-300" disabled={loading} type="submit">
            {loading ? 'Sending...' : 'Send reset instructions'}
          </button>
        </form>
        <Link className="mt-5 block text-center text-sm font-semibold text-blue-600" to="/login">Back to login</Link>
      </section>
    </main>
  )
}

export default ForgotPassword
