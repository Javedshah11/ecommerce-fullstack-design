import { useState } from 'react'
import { Link } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

function ProductGrid() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const chips = ['Samsung', 'Apple', 'Pocco', 'Metallic', '4 star']

  return (
    <main className="bg-slate-100 px-4 py-5">
      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-sm text-slate-500">
          Home &gt; Clothing &gt; Men's wear &gt; Summer clothing
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
          <FilterSidebar />

          <section>
            <div className="mb-3 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span className="rounded-md border border-blue-200 bg-white px-3 py-1.5 text-sm text-slate-700" key={chip}>
                  {chip} x
                </span>
              ))}
              <button className="text-sm font-semibold text-blue-600" type="button">Clear all filter</button>
            </div>

            <div className="mb-4 flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
              <p className="font-medium text-slate-900">12,911 items in Mobile accessory</p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden"
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  Filter
                </button>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" /> Verified only
                </label>
                <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                  <option>Featured</option>
                </select>
                <Link className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600" to="/products">
                  List
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 9).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination />
          </section>
        </div>
      </div>
    </main>
  )
}

export default ProductGrid
