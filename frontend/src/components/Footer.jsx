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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)_1fr]">
        <div>
          <Link className="flex items-center gap-2 text-2xl font-bold text-blue-600" to="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              B
            </span>
            Brand
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Best information about the company goes here but now lorem ipsum is.
          </p>
          <div className="mt-4 flex gap-2">
            {['f', 't', 'in', 'ig'].map((item) => (
              <a className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-white" href="#home" key={item}>
                {item}
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-semibold text-slate-900">{column.title}</h3>
            <div className="mt-3 space-y-2">
              {column.links.map((link) => (
                <a className="block text-sm text-slate-500 hover:text-blue-600" href="#home" key={link}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="font-semibold text-slate-900">Get app</h3>
          <div className="mt-3 space-y-2">
            <div className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white">App Store</div>
            <div className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Google Play</div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 text-sm text-slate-500 sm:flex-row">
          <p>© 2026 Ecommerce.</p>
          <p>English</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
