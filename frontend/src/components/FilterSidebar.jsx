import { Link } from 'react-router-dom'
import categories from '../data/categories'

function FilterSidebar({ isMobile = false }) {
  return (
    <aside className={isMobile ? 'block' : 'hidden lg:block'}>
      <div className="rounded-md border border-slate-200 bg-white p-4">
        <h2 className="font-semibold text-slate-900">Catalog filters</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Browse products by category, then refine results with search and sorting controls.
        </p>

        <div className="mt-5 border-t border-slate-200 pt-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Categories</h3>
          <div className="space-y-1">
            <Link className="block rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50" to="/products-grid">
              All products
            </Link>
            {categories.map((category) => (
              <Link
                className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                key={category}
                to={`/products-grid?category=${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-md bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Buyer tools</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>Use search for product names and descriptions.</li>
            <li>Sort products by price, newest, or featured status.</li>
            <li>Open a product to review stock, price, and details.</li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar
