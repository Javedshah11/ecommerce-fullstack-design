// ProductCard receives product details through props and displays them in a card.
function ProductCard({ image, title, price }) {
  return (
    <article className="product-card">
      <img className="product-card__image" src={image} alt={title} />

      <div className="product-card__content">
        <h3>{title}</h3>
        <p>${price.toFixed(2)}</p>
      </div>
    </article>
  )
}

// Export ProductCard so product pages can import and use it.
export default ProductCard
