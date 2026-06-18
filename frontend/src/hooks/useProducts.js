import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../api/products'

function normalizeParams(params) {
  return JSON.stringify(params || {})
}

export default function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    totalProducts: 0,
    totalPages: 1,
    showing: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const paramsKey = normalizeParams(params)

  const loadProducts = useCallback(async () => {
    await Promise.resolve()

    try {
      setLoading(true)
      setError('')
      const data = await getProducts(JSON.parse(paramsKey))
      setProducts(data.products || [])
      setPagination(data.pagination || {
        page: 1,
        limit: 8,
        totalProducts: 0,
        totalPages: 1,
        showing: 0,
      })
    } catch {
      setError('Products could not be loaded. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [paramsKey])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProducts()
    }, 0)

    return () => clearTimeout(timeout)
  }, [loadProducts])

  return { products, pagination, loading, error, retry: loadProducts }
}
