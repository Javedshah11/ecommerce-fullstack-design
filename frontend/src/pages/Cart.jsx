// Cart displays sample cart items without using a backend.
function Cart() {
  const cartItems = [
    { id: 1, title: 'Wireless Headphones', price: 59.99, quantity: 1 },
    { id: 2, title: 'Classic Backpack', price: 44.99, quantity: 2 },
  ]

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <main id="cart" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <section className="mx-auto mb-10 max-w-4xl">
        <p className="mb-3 text-sm font-black uppercase tracking-wide text-teal-700">
          Your order
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Shopping Cart
        </h1>
      </section>

      <section className="mx-auto grid max-w-4xl gap-4" aria-label="Cart items">
        {cartItems.map((item) => (
          <article
            className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:flex-row sm:items-center"
            key={item.id}
          >
            <div>
              <h2 className="text-lg font-black text-slate-950">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Quantity: {item.quantity}
              </p>
            </div>
            <p className="text-xl font-black text-slate-950">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </article>
        ))}
      </section>

      <section
        className="mx-auto mt-5 flex max-w-4xl flex-col justify-between gap-3 rounded-2xl bg-slate-950 p-5 text-white sm:flex-row sm:items-center"
        aria-label="Cart total"
      >
        <span className="font-bold text-slate-300">Total Price</span>
        <strong className="text-2xl font-black">${totalPrice.toFixed(2)}</strong>
      </section>
    </main>
  )
}

// Export Cart so it can be used later with routing.
export default Cart
