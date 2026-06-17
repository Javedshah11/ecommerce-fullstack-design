// ProductCard receives product details through props and displays them in a card.
function ProductCard({ image, title, price, description }) {
  return (
    <article className="product-card">
      <img className="product-card__image" src={image} alt={title} />

      <div className="product-card__content">
        <div>
          <p className="product-card__label">Best seller</p>
          <h3>{title}</h3>
          <p className="product-card__description">{description}</p>
        </div>

        <div className="product-card__footer">
          <p className="product-card__price">${price.toFixed(2)}</p>
          <button type="button">Add</button>
        </div>
      </div>
    </article>
  )
}

// Export ProductCard so product pages can import and use it.
export default ProductCard
