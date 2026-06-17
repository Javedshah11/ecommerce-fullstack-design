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
    <main id="cart" className="page cart-page">
      <section className="section-heading">
        <p className="section-heading__eyebrow">Your order</p>
        <h1>Shopping Cart</h1>
      </section>

      <section className="cart-list" aria-label="Cart items">
        {cartItems.map((item) => (
          <article className="cart-item" key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
            </div>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </article>
        ))}
      </section>

      <section className="cart-total" aria-label="Cart total">
        <span>Total Price</span>
        <strong>${totalPrice.toFixed(2)}</strong>
      </section>
    </main>
  )
}

// Export Cart so it can be used later with routing.
export default Cart
