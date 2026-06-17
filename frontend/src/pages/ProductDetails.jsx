// Import dummy product data so this page can show one sample product.
import products from '../data/products'

// ProductDetails displays more information for a single product.
function ProductDetails() {
  const product = products[0]

  return (
    <main className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <img
          className="w-full rounded-3xl object-cover shadow-2xl shadow-slate-900/15"
          src={product.image}
          alt={product.title}
        />

        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-teal-700">
            Product details
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-4 text-2xl font-black text-teal-700">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
            {product.description}
          </p>
          <button
            className="mt-8 rounded-full bg-teal-500 px-7 py-4 font-black text-white shadow-xl shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-600"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  )
}

// Export ProductDetails so it can be used later with routing.
export default ProductDetails
