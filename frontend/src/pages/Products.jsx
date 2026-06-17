// Import the reusable card component used to display each product.
import ProductCard from '../components/ProductCard'

// Import dummy product data for the Week 1 frontend only.
import products from '../data/products'

// Products displays a responsive grid of product cards.
function Products() {
  return (
    <main id="products" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <section className="mx-auto mb-10 max-w-7xl">
        <p className="mb-3 text-sm font-black uppercase tracking-wide text-teal-700">
          Featured collection
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Products
        </h1>
      </section>

      <section
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Product list"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </section>
    </main>
  )
}

// Export Products so it can be used later with routing.
export default Products
