import { Link } from 'react-router-dom'
import ApiError from '../components/ApiError'
import DiscountBanner from '../components/DiscountBanner'
import useCart from '../hooks/useCart'
import { getProductId, getProductName } from '../utils/product'

function Cart() {
  const {
    cartItems,
    loading,
    error,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart()
  const tax = cartItems.length ? 14 : 0
  const total = subtotal + tax

  return (
    <main className="bg-slate-100 px-4 py-5">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-5 text-2xl font-semibold text-slate-900">My cart ({cartItems.length})</h1>

        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <section className="rounded-md border border-slate-200 bg-white p-4">
            {loading && <p className="rounded-md bg-slate-50 p-6 text-center text-sm text-slate-600">Loading cart...</p>}
            {error && <ApiError message={error} onRetry={() => window.location.reload()} />}
            {!loading && !error && cartItems.length === 0 && (
              <div className="rounded-md bg-slate-50 p-10 text-center">
                <h2 className="text-xl font-semibold text-slate-900">Your cart is empty</h2>
                <p className="mt-2 text-sm text-slate-500">Add products from the catalog to review them here.</p>
                <Link className="mt-5 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white" to="/products-grid">
                  Start shopping
                </Link>
              </div>
            )}

            {!loading && !error && cartItems.length > 0 && (
              <div className="divide-y divide-slate-200">
                {cartItems.map((item) => {
                  const productId = getProductId(item)
                  const quantityOptions = Array.from({ length: Math.min(item.stock, 10) }).map((_, index) => index + 1)

                  return (
                    <article className="grid gap-4 py-4 first:pt-0 sm:grid-cols-[90px_1fr_auto]" key={productId}>
                      <img className="h-20 w-20 rounded-md border border-slate-200 object-cover" src={item.image} alt={getProductName(item)} />
                      <div>
                        <h2 className="font-semibold text-slate-900">{getProductName(item)}</h2>
                        <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                        <p className="text-sm text-slate-500">{item.stock} units available</p>
                        <button
                          className="mt-3 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-red-600"
                          type="button"
                          onClick={() => removeFromCart(productId)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="sm:text-right">
                        <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <select
                          className="mt-3 rounded-md border border-slate-200 px-3 py-2 text-sm"
                          value={item.quantity}
                          onChange={(event) => updateQuantity(productId, event.target.value)}
                        >
                          {quantityOptions.map((quantity) => (
                            <option key={quantity} value={quantity}>Qty: {quantity}</option>
                          ))}
                        </select>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Link className="rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white" to="/products-grid">Back to shop</Link>
                <button
                  className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-semibold text-blue-600"
                  type="button"
                  onClick={clearCart}
                >
                  Remove all
                </button>
              </div>
            )}
          </section>

          <aside className="h-fit rounded-md border border-slate-200 bg-white p-4">
            <div className="space-y-2 border-b border-slate-200 pb-3 text-sm">
              <p className="flex justify-between text-slate-600"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></p>
              <p className="flex justify-between text-green-600"><span>Tax:</span><span>+${tax.toFixed(2)}</span></p>
            </div>
            <p className="mt-3 flex justify-between text-lg font-semibold text-slate-900"><span>Total:</span><span>${total.toFixed(2)}</span></p>
            <Link
              className={`mt-4 block w-full rounded-md py-3 text-center font-semibold text-white ${cartItems.length === 0 ? 'pointer-events-none bg-slate-300' : 'bg-green-600 hover:bg-green-700'}`}
              to="/checkout"
            >
              Checkout
            </Link>
          </aside>
        </div>
      </div>

      <DiscountBanner />
    </main>
  )
}

export default Cart
