import { useState } from 'react'
import { Link } from 'react-router-dom'
import ApiError from '../components/ApiError'
import FilterSidebar from '../components/FilterSidebar'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import Pagination from '../components/Pagination'
import ProductListItem from '../components/ProductListItem'
import useProducts from '../hooks/useProducts'

function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const { products, pagination, loading, error, retry } = useProducts({ sort, page, limit: 8 })

  return (
    <main className="bg-slate-100 px-4 py-5">
      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-sm text-slate-500">
          Home &gt; Catalog &gt; List view
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
          <FilterSidebar />

          <section>
            <div className="mb-4 flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
              <p className="font-medium text-slate-900">
                Showing {pagination.showing} of {pagination.totalProducts} products
              </p>
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
                <select
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm"
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value)
                    setPage(1)
                  }}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
                <Link className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600" to="/products-grid">
                  Grid
                </Link>
              </div>
            </div>

            {loading && <p className="rounded-md bg-white p-5 text-sm text-slate-600">Loading products...</p>}
            {error && <ApiError message={error} onRetry={retry} />}
            {!loading && !error && (
              <div className="space-y-3">
                {products.map((product) => (
                  <ProductListItem key={product._id} product={product} />
                ))}
              </div>
            )}

            {!loading && !error && pagination.totalPages > 1 && (
              <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default Products
