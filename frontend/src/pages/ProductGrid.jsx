import { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ApiError from '../components/ApiError'
import FilterSidebar from '../components/FilterSidebar'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import categories from '../data/categories'
import useProducts from '../hooks/useProducts'

function ProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const featured = searchParams.get('featured') || undefined
  const sort = searchParams.get('sort') || 'newest'
  const page = Number(searchParams.get('page')) || 1
  const limit = 8
  const { products, pagination, loading, error, retry } = useProducts({
    search,
    category,
    featured,
    sort,
    page,
    limit,
  })

  const updateCatalogParams = useCallback((nextValues) => {
    const nextParams = new URLSearchParams(searchParams)

    Object.entries(nextValues).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value)
      } else {
        nextParams.delete(key)
      }
    })

    if (nextValues.search !== undefined || nextValues.category !== undefined) {
      nextParams.delete('featured')
    }

    setSearchParams(nextParams)
  }, [searchParams, setSearchParams])

  useEffect(() => {
    const timeout = setTimeout(() => setSearchInput(search), 0)
    return () => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== search) {
        updateCatalogParams({ search: searchInput, page: '1' })
      }
    }, 450)

    return () => clearTimeout(timeout)
  }, [searchInput, search, updateCatalogParams])

  return (
    <main className="bg-slate-100 px-4 py-5">
      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-sm text-slate-500">
          Home &gt; Catalog
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
          <FilterSidebar />

          <section>
            <div className="mb-4 grid gap-3 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px]">
              <input
                className="rounded-md border border-slate-200 px-3 py-2 text-sm"
                placeholder="Search products"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />

              <select
                className="rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={category}
                onChange={(event) => updateCatalogParams({ category: event.target.value, page: '1' })}
              >
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
              <button
                className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium ${!category ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
                type="button"
                onClick={() => updateCatalogParams({ category: '', page: '1' })}
              >
                All
              </button>
              {categories.map((item) => (
                <button
                  className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium ${category === item ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
                  key={item}
                  type="button"
                  onClick={() => updateCatalogParams({ category: item, page: '1' })}
                >

                  {item}
                </button>
              ))}
            </div>


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
                  onChange={(event) => updateCatalogParams({ sort: event.target.value, page: '1' })}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
                <Link className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600" to="/products">
                  List
                </Link>
              </div>
            </div>

            {loading && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: limit }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            )}
            {error && <ApiError message={error} onRetry={retry} />}
            {!loading && !error && (
              products.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-slate-200 bg-white p-8 text-center">
                  <h2 className="text-lg font-semibold text-slate-900">No products found</h2>
                  <p className="mt-2 text-sm text-slate-500">Try a different search term or category.</p>
                </div>
              )
            )}

            {!loading && !error && pagination.totalPages > 1 && (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(nextPage) => updateCatalogParams({ page: String(nextPage) })}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default ProductGrid
