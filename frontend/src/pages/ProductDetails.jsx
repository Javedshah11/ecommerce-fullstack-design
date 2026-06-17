// Import dummy product data so this page can show one sample product.
import products from '../data/products'

// ProductDetails displays more information for a single product.
function ProductDetails() {
  const product = products[0]

  return (
    <main className="page product-details-page">
      <section className="product-details">
        <img
          className="product-details__image"
          src={product.image}
          alt={product.title}
        />

        <div className="product-details__content">
          <p className="section-heading__eyebrow">Product details</p>
          <h1>{product.title}</h1>
          <p className="product-details__price">${product.price.toFixed(2)}</p>
          <p className="product-details__description">
            {product.description}
          </p>
          <button className="button button--primary" type="button">
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  )
}

// Export ProductDetails so it can be used later with routing.
export default ProductDetails
