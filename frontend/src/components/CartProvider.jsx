import { useEffect, useState } from 'react'
import { getProductById } from '../api/products'
import CartContext from '../context/CartContext'
import { getCartItems, saveCartItems } from '../utils/cart'
import { getProductId, getProductName } from '../utils/product'

function CartProvider({ children }) {
  const [storedItems, setStoredItems] = useState(() => getCartItems())
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    saveCartItems(storedItems)
  }, [storedItems])

  useEffect(() => {
    let isActive = true

    async function loadCartProducts() {
      await Promise.resolve()

      try {
        if (!isActive) return
        setLoading(true)
        setError('')
        const results = await Promise.allSettled(
          storedItems.map(async (item) => {
            const product = await getProductById(item.productId)

            if (product.stock <= 0) {
              return null
            }

            return {
              ...product,
              quantity: Math.max(1, Math.min(item.quantity, product.stock)),
            }
          }),
        )
        const detailedItems = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value)
          .filter(Boolean)

        const rejectedResults = results.filter((result) => result.status === 'rejected')
        const networkError = rejectedResults.some((result) => {
          const status = result.reason?.response?.status
          return status !== 400 && status !== 404
        })

        if (networkError) {
          throw new Error('Cart products could not be loaded.')
        }

        const missingProductIds = storedItems
          .filter((item, index) => {
            const result = results[index]
            const status = result.reason?.response?.status
            return (
              (result.status === 'rejected' && (status === 400 || status === 404)) ||
              (result.status === 'fulfilled' && result.value === null)
            )
          })
          .map((item) => item.productId)

        if (missingProductIds.length > 0) {
          setStoredItems((current) =>
            current.filter((item) => !missingProductIds.includes(item.productId)),
          )
        }

        if (isActive) setCartItems(detailedItems)
      } catch {
        if (isActive) setError('Cart products could not be loaded.')
      } finally {
        if (isActive) setLoading(false)
      }
    }

    loadCartProducts()

    return () => {
      isActive = false
    }
  }, [storedItems])

  useEffect(() => {
    if (!toast) return undefined

    const timeout = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(timeout)
  }, [toast])

  function addToCart(product, quantity = 1) {
    const productId = getProductId(product)

    if (!productId || product.stock === 0) {
      setToast('This product is out of stock.')
      return
    }

    setStoredItems((current) => {
      const existingItem = current.find((item) => item.productId === productId)

      if (existingItem) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item,
        )
      }

      return [...current, { productId, quantity: Math.min(quantity, product.stock) }]
    })
    setToast(`${getProductName(product)} added to cart.`)
  }

  function updateQuantity(productId, quantity) {
    const product = cartItems.find((item) => getProductId(item) === productId)
    const nextQuantity = Math.max(1, Math.min(Number(quantity), product?.stock || Number(quantity)))

    setStoredItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  function removeFromCart(productId) {
    const product = cartItems.find((item) => getProductId(item) === productId)
    setStoredItems((current) => current.filter((item) => item.productId !== productId))
    setToast(`${product ? getProductName(product) : 'Product'} removed from cart.`)
  }

  function clearCart() {
    setStoredItems([])
    setToast('Cart cleared.')
  }

  const itemCount = storedItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        storedItems,
        loading,
        error,
        toast,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
