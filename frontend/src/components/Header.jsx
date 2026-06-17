import { Link, NavLink } from 'react-router-dom'
import categories from '../data/categories'

const iconLinks = [
  { label: 'Profile', to: '/products' },
  { label: 'Message', to: '/products' },
  { label: 'Orders', to: '/cart' },
  { label: 'My cart', to: '/cart' },
]

function Header() {
  return (
    <header className="hidden border-b border-slate-200 bg-white lg:block">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-5">
        <Link className="flex shrink-0 items-center gap-2 text-2xl font-bold text-blue-600" to="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            B
          </span>
          Brand
        </Link>

        <form className="flex h-10 flex-1 overflow-hidden rounded-md border-2 border-blue-500">
          <input
            className="min-w-0 flex-1 px-4 text-sm outline-none"
            placeholder="Search"
            type="search"
          />
          <select className="border-l border-blue-200 px-3 text-sm outline-none">
            <option>All category</option>
            {categories.slice(0, 5).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button className="bg-blue-600 px-6 text-sm font-semibold text-white" type="submit">
            Search
          </button>
        </form>

        <div className="flex items-center gap-5">
          {iconLinks.map((item) => (
            <Link className="flex flex-col items-center gap-1 text-xs text-slate-500 hover:text-blue-600" key={item.label} to={item.to}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0M4 7h16M6 11h12" />
              </svg>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm text-slate-700">
          <nav className="flex items-center gap-6 font-medium">
            <NavLink className="font-semibold text-slate-900" to="/products">
              All category
            </NavLink>
            <NavLink to="/products">Hot offers</NavLink>
            <NavLink to="/products-grid">Gift boxes</NavLink>
            <NavLink to="/products">Projects</NavLink>
            <NavLink to="/products">Menu item</NavLink>
            <span>Help</span>
          </nav>
          <div className="flex items-center gap-8">
            <span>English, USD</span>
            <span>Ship to United States</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
