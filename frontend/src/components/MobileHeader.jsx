import { Link } from 'react-router-dom'

function IconButton({ children, label, onClick }) {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function MobileHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconButton label="Open menu" onClick={onMenuClick}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </IconButton>
          <Link className="flex items-center gap-2 text-xl font-bold text-blue-600" to="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              B
            </span>
            Brand
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link className="text-slate-600" to="/cart" aria-label="Cart">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l2.4 12.2A2 2 0 0 0 9.36 17h7.78a2 2 0 0 0 1.95-1.57L21 7H6" />
              <circle cx="10" cy="20" r="1" fill="currentColor" />
              <circle cx="17" cy="20" r="1" fill="currentColor" />
            </svg>
          </Link>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
            U
          </span>
        </div>
      </div>

      <div className="mt-3 flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder="Search products"
          type="search"
        />
      </div>
    </header>
  )
}

export default MobileHeader
