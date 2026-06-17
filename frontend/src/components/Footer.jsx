import { Link } from 'react-router-dom'

const columns = [
  { title: 'About', links: ['About us', 'Find store', 'Categories', 'Blogs'] },
  { title: 'Partnership', links: ['About us', 'Find store', 'Categories', 'Blogs'] },
  { title: 'Information', links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'] },
  { title: 'For users', links: ['Login', 'Register', 'Settings', 'My Orders'] },
]

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-295 grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)_1fr]">
        <div>
          <Link className="flex items-center gap-2 text-3xl font-bold text-blue-300" to="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8V6a5 5 0 0 1 10 0v2M5 8h14l-1 12H6L5 8Z" />
              </svg>
            </span>
            Brand
          </Link>
          <p className="mt-6 max-w-64 text-base leading-7 text-slate-600">
            Best information about the company gies here but now lorem ipsum is
          </p>
          <div className="mt-5 flex gap-3">
            {['f', 't', 'in', 'ig', 'yt'].map((item) => (
              <a className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-white" href="#home" key={item}>
                {item}
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-base font-semibold text-slate-900">{column.title}</h3>
            <div className="mt-4 space-y-2">
              {column.links.map((link) => (
                <a className="block text-base text-slate-400 hover:text-blue-600" href="#home" key={link}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-base font-semibold text-slate-900">Get app</h3>
          <div className="mt-4 space-y-2">
            <div className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Download on the App Store</div>
            <div className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Get it on Google Play</div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-6">
        <div className="mx-auto flex max-w-295 flex-col justify-between gap-2 text-base text-slate-500 sm:flex-row">
          <p>&copy; 2026 Ecommerce.</p>
          <p className="flex items-center gap-2">
            <img className="h-4 w-6 object-cover" src="https://flagcdn.com/w40/us.png" alt="United States" />
            English
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
