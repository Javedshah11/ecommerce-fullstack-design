import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { addOrder } from '../utils/orders'
import { getProductId, getProductName } from '../utils/product'

function Checkout() {
  const { cartItems, subtotal, clearCart, loading, error } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [delivery, setDelivery] = useState('standard')
  const shipping = delivery === 'express' ? 24 : cartItems.length ? 8 : 0
  const tax = cartItems.length ? 14 : 0
  const total = subtotal + shipping + tax

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    addOrder({
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Processing',
      customer: formData.get('name'),
      email: formData.get('email'),
      delivery,
      total,
      items: cartItems.map((item) => ({
        id: getProductId(item),
        name: getProductName(item),
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
    })

    clearCart()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <main className="bg-slate-100 px-4 py-10">
        <section className="mx-auto max-w-3xl rounded-md border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">Order confirmed</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Thanks for your purchase</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Your order has been received and a confirmation summary is ready in your orders area.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white" to="/orders">
              View orders
            </Link>
            
            <Link className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-semibold text-blue-600" to="/products-grid">
              Continue shopping
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-slate-100 px-4 py-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_360px]">
        <form className="rounded-md border border-slate-200 bg-white p-5" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
          {loading && <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm text-slate-600">Loading checkout...</p>}
          {error && <p className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Full name" required />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email address" required type="email" />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="phone" placeholder="Phone number" required />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="city" placeholder="City" required />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="address" placeholder="Street address" required />
          </div>

          <div className="mt-6 rounded-md border border-slate-200 p-4">
            <h2 className="font-semibold text-slate-900">Delivery method</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                { id: 'standard', label: 'Standard', detail: '3-5 business days', price: '$8.00' },
                { id: 'express', label: 'Express', detail: '1-2 business days', price: '$24.00' },
              ].map((option) => (
                <label className="rounded-md border border-slate-200 p-4 text-sm" key={option.id}>
                  <input
                    checked={delivery === option.id}
                    name="delivery"
                    type="radio"
                    value={option.id}
                    onChange={(event) => setDelivery(event.target.value)}
                  />
                  <span className="ml-2 font-semibold text-slate-900">{option.label}</span>
                  <span className="mt-1 block text-slate-500">{option.detail} - {option.price}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-md border border-slate-200 p-4">
            <h2 className="font-semibold text-slate-900">Payment</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <input className="rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" placeholder="Card number" required />
              <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" placeholder="MM / YY" required />
              <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" placeholder="CVC" required />
            </div>
          </div>

          <button
            className="mt-6 rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={cartItems.length === 0 || loading || Boolean(error)}
            type="submit"
          >
            Place order
          </button>
        </form>

        <aside className="h-fit rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
          <div className="mt-4 divide-y divide-slate-200">
            {cartItems.map((item) => (
              <div className="flex gap-3 py-3 first:pt-0" key={getProductId(item)}>
                <img className="h-16 w-16 rounded-md border border-slate-200 object-cover" src={item.image} alt={getProductName(item)} />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-slate-900">{getProductName(item)}</p>
                  <p className="mt-1 text-sm text-slate-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          {cartItems.length === 0 && <p className="mt-4 text-sm text-slate-500">Your cart is empty.</p>}
          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <p className="flex justify-between text-slate-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p>
            <p className="flex justify-between text-slate-600"><span>Shipping</span><span>${shipping.toFixed(2)}</span></p>
            <p className="flex justify-between text-slate-600"><span>Tax</span><span>${tax.toFixed(2)}</span></p>
            <p className="flex justify-between text-lg font-semibold text-slate-900"><span>Total</span><span>${total.toFixed(2)}</span></p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Checkout
