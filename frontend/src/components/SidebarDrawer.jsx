import { Link } from 'react-router-dom'

const drawerLinks = [
  { label: 'Home', icon: 'M3 11.5 12 4l9 7.5M5 10v10h14V10' },
  { label: 'Categories', icon: 'M4 5h7v7H4V5Zm9 0h7v7h-7V5ZM4 14h7v5H4v-5Zm9 0h7v5h-7v-5Z' },
  { label: 'Favorites', icon: 'M21 8.25c0-2.35-1.9-4.25-4.25-4.25A5.1 5.1 0 0 0 12 7a5.1 5.1 0 0 0-4.75-3C4.9 4 3 5.9 3 8.25c0 6.5 9 11.75 9 11.75s9-5.25 9-11.75Z' },
  { label: 'My orders', icon: 'M6 3h12l1 18H5L6 3Zm3 4h6' },
  { label: 'English | USD', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3c2 2.2 3 5.2 3 9s-1 6.8-3 9M12 3c-2 2.2-3 5.2-3 9s1 6.8 3 9' },
  { label: 'Contact us', icon: 'M4 5h16v10H7l-3 3V5Z' },
  { label: 'About', icon: 'M12 17v-6M12 8h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z' },
  { label: 'User agreement', icon: 'M7 3h8l4 4v14H7V3Zm8 0v5h5M10 13h6M10 17h6' },
  { label: 'Partnership', icon: 'M8 12h8M6 16h12M7 8h10M5 21h14V5H5v16Z' },
  { label: 'Privacy policy', icon: 'M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z' },
]

function SidebarDrawer({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
      <button
        className={`absolute inset-0 bg-slate-900/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-80 max-w-[86vw] bg-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="border-b border-slate-200 bg-slate-100 p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-300 text-slate-600">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" />
              </svg>
            </div>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600"
              type="button"
              aria-label="Close menu"
              onClick={onClose}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <p className="font-medium text-slate-800">Sign in | Register</p>
        </div>

        <nav className="py-2">
          {drawerLinks.map((item, index) => (
            <Link
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 ${index === 4 || index === 7 ? 'border-t border-slate-200' : ''}`}
              key={item.label}
              to={item.label === 'Home' ? '/' : item.label === 'My orders' ? '/cart' : '/products'}
              onClick={onClose}
            >
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  )
}

export default SidebarDrawer
