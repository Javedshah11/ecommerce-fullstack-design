import { useState } from 'react'
import { Link } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

function ProductGrid() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('Featured')
  const [chips, setChips] = useState(['Samsung', 'Apple', 'Pocco', 'Metallic', '4 star'])

  const visibleProducts = products
    .filter((product) => (verifiedOnly ? product.verified : true))
    .toSorted((first, second) => {
      if (sortBy === 'Lowest price') return first.price - second.price
      if (sortBy === 'Newest') return second.id - first.id
      return second.rating - first.rating
    })
    .slice(0, 9)

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
                <button
                  className="rounded-md border border-blue-200 bg-white px-3 py-1.5 text-sm text-slate-700"
                  key={chip}
                  type="button"
                  onClick={() => setChips((current) => current.filter((item) => item !== chip))}
                >
                  {chip} x
                </button>
              ))}
              <button className="text-sm font-semibold text-blue-600" type="button" onClick={() => setChips([])}>Clear all filter</button>
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
                  <input
                    checked={verifiedOnly}
                    type="checkbox"
                    onChange={(event) => setVerifiedOnly(event.target.checked)}
                  />{' '}
                  Verified only
                </label>
                <select
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>Lowest price</option>
                </select>
                <Link className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600" to="/products">
                  List
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => (
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
