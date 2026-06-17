// Import the reusable card component used to display each product.
import ProductCard from '../components/ProductCard'

// Import dummy product data for the Week 1 frontend only.
import products from '../data/products'

// Products displays a responsive grid of product cards.
function Products() {
  return (
    <main id="products" className="page products-page">
      <section className="section-heading">
        <p className="section-heading__eyebrow">Featured collection</p>
        <h1>Products</h1>
      </section>

      <section className="products-grid" aria-label="Product list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </section>
    </main>
  )
}

// Export Products so it can be used later with routing.
export default Products
