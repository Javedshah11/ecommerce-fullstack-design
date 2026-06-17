import { useState } from 'react'
import { Link } from 'react-router-dom'
import DiscountBanner from '../components/DiscountBanner'
import ProductCard from '../components/ProductCard'
import products, { savedItems } from '../data/products'

function Cart() {
  const [cartItems, setCartItems] = useState(
    products.slice(0, 3).map((item) => ({ ...item, quantity: 1 })),
  )
  const [savedForLater, setSavedForLater] = useState(savedItems)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [message, setMessage] = useState('')
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = couponApplied ? 60 : 0
  const tax = 14
  const total = subtotal - discount + tax

  function updateQuantity(id, quantity) {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item,
      ),
    )
  }

  function removeItem(id) {
    setCartItems((current) => current.filter((item) => item.id !== id))
    setMessage('Item removed from cart.')
  }

  function saveItem(item) {
    setSavedForLater((current) =>
      current.some((saved) => saved.id === item.id) ? current : [...current, item],
    )
    removeItem(item.id)
    setMessage('Item saved for later.')
  }

  function applyCoupon() {
    if (coupon.trim()) {
      setCouponApplied(true)
      setMessage('Coupon applied successfully.')
    } else {
      setMessage('Enter a coupon code first.')
    }
  }

  return (
    <main className="bg-slate-100 px-4 py-5">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-5 text-2xl font-semibold text-slate-900">My cart ({cartItems.length})</h1>

        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <section className="rounded-md border border-slate-200 bg-white p-4">
            <div className="divide-y divide-slate-200">
              {cartItems.map((item) => (
                <article className="grid gap-4 py-4 first:pt-0 sm:grid-cols-[90px_1fr_auto]" key={item.id}>
                  <img className="h-20 w-20 rounded-md border border-slate-200 object-cover" src={item.image} alt={item.title} />
                  <div>
                    <h2 className="font-semibold text-slate-900">{item.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">Size: medium, Color: blue, Material: plastic</p>
                    <p className="text-sm text-slate-500">Seller: {item.supplier}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-red-600"
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                      <button
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-blue-600"
                        type="button"
                        onClick={() => saveItem(item)}
                      >
                        Save for later
                      </button>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <select
                      className="mt-3 rounded-md border border-slate-200 px-3 py-2 text-sm"
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, event.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>Qty: {quantity}</option>
                      ))}
                    </select>
                  </div>
                </article>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className="rounded-md bg-slate-50 p-6 text-center text-sm text-slate-600">
                Your cart is empty.
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link className="rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white" to="/products-grid">Back to shop</Link>
              <button
                className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-semibold text-blue-600"
                type="button"
                onClick={() => {
                  setCartItems([])
                  setMessage('All cart items removed.')
                }}
              >
                Remove all
              </button>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-md border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">Have a coupon?</p>
              <div className="mt-2 flex">
                <input
                  className="min-w-0 flex-1 rounded-l-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                />
                <button className="rounded-r-md border border-l-0 border-slate-200 px-3 text-sm font-semibold text-blue-600" type="button" onClick={applyCoupon}>Apply</button>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-4">
              <div className="space-y-2 border-b border-slate-200 pb-3 text-sm">
                <p className="flex justify-between text-slate-600"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></p>
                <p className="flex justify-between text-red-500"><span>Discount:</span><span>-${discount.toFixed(2)}</span></p>
                <p className="flex justify-between text-green-600"><span>Tax:</span><span>+${tax.toFixed(2)}</span></p>
              </div>
              <p className="mt-3 flex justify-between text-lg font-semibold text-slate-900"><span>Total:</span><span>${total.toFixed(2)}</span></p>
              <button
                className="mt-4 w-full rounded-md bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                type="button"
                disabled={cartItems.length === 0}
                onClick={() => setMessage('Checkout preview is ready. Backend payment comes later.')}
              >
                Checkout
              </button>
              {message && <p className="mt-3 text-sm font-medium text-blue-700">{message}</p>}
            </div>
          </aside>
        </div>

        <section className="mt-5 rounded-md border border-slate-200 bg-white p-4">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Saved for later</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {savedForLater.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>

      <DiscountBanner />
    </main>
  )
}

export default Cart
