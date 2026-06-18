import { useState } from 'react'
import { getOrders } from '../utils/orders'

function Profile() {
  const orders = getOrders()
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ecommerce_profile')) || {
        name: '',
        email: '',
        phone: '',
        country: '',
      }
    } catch {
      return { name: '', email: '', phone: '', country: '' }
    }
  })
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setProfile((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  function saveProfile() {
    localStorage.setItem('ecommerce_profile', JSON.stringify(profile))
    setMessage('Profile saved.')
  }

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U'

  return (
    <main className="bg-slate-100 px-4 py-6">
      <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700">{initials}</span>
            <div>
              <h1 className="font-semibold text-slate-900">{profile.name || 'Your account'}</h1>
              <p className="text-sm text-slate-500">{profile.email || 'Add your contact details'}</p>
            </div>
          </div>
          <nav className="mt-6 space-y-1 text-sm">
            {['Account overview', 'Addresses', 'Payment methods', 'Preferences'].map((item, index) => (
              <button
                className={`block w-full rounded-md px-3 py-2 text-left ${index === 0 ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <div className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-2xl font-semibold text-slate-900">Account overview</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { label: 'Open orders', value: orders.filter((order) => order.status !== 'Delivered').length },
              { label: 'Completed orders', value: orders.filter((order) => order.status === 'Delivered').length },
              { label: 'Total orders', value: orders.length },
            ].map((item) => (
              <div className="rounded-md border border-slate-200 p-4" key={item.label}>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>

          <form className="mt-6 grid gap-4 md:grid-cols-2">
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Full name" value={profile.name} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email address" type="email" value={profile.email} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="phone" placeholder="Phone number" value={profile.phone} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="country" placeholder="Country" value={profile.country} onChange={handleChange} />
            <button className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white md:w-fit" type="button" onClick={saveProfile}>
              Save changes
            </button>
            {message && <p className="self-center text-sm font-medium text-green-700">{message}</p>}
          </form>
        </div>
      </section>
    </main>
  )
}

export default Profile
