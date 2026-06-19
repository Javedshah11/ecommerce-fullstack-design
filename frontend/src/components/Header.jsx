import { Link, NavLink, useNavigate } from 'react-router-dom'
import categories from '../data/categories'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'

const iconLinks = [
  { label: 'Profile', to: '/profile', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0' },
  { label: 'Message', to: '/profile', icon: 'M4 5h16v10H7l-3 3V5Z' },
  { label: 'Orders', to: '/orders', icon: 'M12 21s-8-4.8-8-11a4 4 0 0 1 7-2.65A4 4 0 0 1 18 10c0 6.2-6 11-6 11Z' },
  { label: 'My cart', to: '/cart', icon: 'M3 3h2l2.4 12.2A2 2 0 0 0 9.36 17h7.78a2 2 0 0 0 1.95-1.57L21 7H6' },
]

function Header() {
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const { isAuthenticated, isAdmin, logout, user } = useAuth()

  function handleSearch(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get('query')?.toString().trim()
    const category = formData.get('category')?.toString()
    const params = new URLSearchParams()

    if (query) params.set('search', query)
    if (category && category !== 'All category') params.set('category', category)

    navigate(`/products-grid${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <header className="hidden border-b border-slate-200 bg-white lg:block">
      <div className="mx-auto flex max-w-295 items-center gap-12 py-7">
        <Link className="flex shrink-0 items-center gap-2 text-[28px] font-bold text-blue-300" to="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8V6a5 5 0 0 1 10 0v2M5 8h14l-1 12H6L5 8Z" />
            </svg>
          </span>
          MarketPro
        </Link>

        <form className="flex h-[42px] flex-1 overflow-hidden rounded-md border-2 border-blue-500" onSubmit={handleSearch}>
          <input
            className="min-w-0 flex-1 px-4 text-base outline-none placeholder:text-slate-400"
            name="query"
            placeholder="Search"
            type="search"
          />
          <select className="w-[165px] border-l border-blue-500 px-3 text-base outline-none" name="category">
            <option>All category</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button className="bg-blue-600 px-8 text-base font-medium text-white" type="submit">
            Search
          </button>
        </form>

        <div className="flex items-center gap-6">
          {iconLinks.map((item) => (
            <Link className="relative flex flex-col items-center gap-1 text-sm text-slate-500 hover:text-blue-600" key={item.label} to={item.to}>
              <svg className="h-6 w-6 text-slate-400" fill={item.label === 'Orders' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                {item.label === 'My cart' && (
                  <>
                    <circle cx="10" cy="20" r="1" fill="currentColor" />
                    <circle cx="17" cy="20" r="1" fill="currentColor" />
                  </>
                )}
              </svg>
              {item.label === 'My cart' && itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                  {itemCount}
                </span>
              )}
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link className="flex flex-col items-center gap-1 text-sm font-semibold text-blue-600" to="/admin">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M7 11h10M7 15h10M4 19h16" />
              </svg>
              Admin
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-295 items-center justify-between py-5 text-base text-slate-900">
          <nav className="flex items-center gap-7 font-medium">
            <NavLink className="flex items-center gap-2 font-semibold text-slate-900" to="/products-grid">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              All category
            </NavLink>
            <NavLink to="/products-grid?featured=true">Hot offers</NavLink>
            <NavLink to="/products-grid?search=watch">Smart watches</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
            <NavLink to="/profile">Account</NavLink>
            <NavLink to="/cart">Help</NavLink>
          </nav>
          <div className="flex items-center gap-8">
            {isAuthenticated ? (
              <button className="font-semibold text-blue-600" type="button" onClick={logout}>
                Logout {user?.name ? `(${user.name})` : ''}
              </button>
            ) : (
              <Link className="font-semibold text-blue-600" to="/login">Login</Link>
            )}
            <span className="flex items-center gap-2">
              Ship to
              <img className="h-4 w-6 object-cover" src="https://flagcdn.com/w40/de.png" alt="Germany" />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
