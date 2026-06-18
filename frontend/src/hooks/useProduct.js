import { useCallback, useEffect, useState } from 'react'
import { getProductById } from '../api/products'

export default function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProduct = useCallback(async () => {
    if (!id) return
    await Promise.resolve()

    try {
      setLoading(true)
      setError('')
      const data = await getProductById(id)
      setProduct(data)
    } catch {
      setError('Product could not be loaded. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProduct()
    }, 0)

    return () => clearTimeout(timeout)
  }, [loadProduct])

  return { product, loading, error, retry: loadProduct }
}
