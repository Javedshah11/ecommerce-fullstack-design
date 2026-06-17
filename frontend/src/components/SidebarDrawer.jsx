import { Link } from 'react-router-dom'

const drawerLinks = [
  'Home',
  'Categories',
  'Favorites',
  'My orders',
  'English | USD',
  'Contact us',
  'About',
  'User agreement',
  'Partnership',
  'Privacy policy',
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
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-300 text-slate-600">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" />
            </svg>
          </div>
          <p className="font-medium text-slate-800">Sign in | Register</p>
        </div>

        <nav className="py-2">
          {drawerLinks.map((item, index) => (
            <Link
              className={`flex items-center px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 ${index === 4 || index === 7 ? 'border-t border-slate-200' : ''}`}
              key={item}
              to={item === 'Home' ? '/' : item === 'My orders' ? '/cart' : '/products'}
              onClick={onClose}
            >
              {item}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  )
}

export default SidebarDrawer
