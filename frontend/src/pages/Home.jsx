// Import the reusable ProductCard component for the featured products grid.
import ProductCard from '../components/ProductCard'

// Import dummy frontend data while the project has no backend.
import products from '../data/products'

const categories = [
  {
    id: 1,
    name: 'Tech Essentials',
    itemCount: '24 products',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Daily Carry',
    itemCount: '18 products',
    image:
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Home Workspace',
    itemCount: '31 products',
    image:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
  },
]

// Home displays the complete professional ecommerce landing page.
function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <main id="home" className="home-page">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">New season essentials</p>
          <h1>Shop smarter with curated everyday products.</h1>
          <p className="hero__subtitle">
            Discover quality tech, lifestyle, and home essentials in one clean
            shopping experience built for comfort and confidence.
          </p>
          <a className="button button--primary" href="#products">
            Shop Now
          </a>
        </div>

        <div className="hero__image-wrap" aria-label="Featured ecommerce collection">
          <img
            className="hero__image"
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1000&q=80"
            alt="Modern ecommerce products arranged for online shopping"
          />
          <div className="hero__stat">
            <strong>8k+</strong>
            <span>happy shoppers</span>
          </div>
        </div>
      </section>

      <section id="products" className="landing-section">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Featured products</p>
          <h2>Popular picks this week</h2>
          <p>
            Handpicked products with simple cards, clean props, and reusable
            React components.
          </p>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </section>

      <section id="categories" className="landing-section categories-section">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Shop by category</p>
          <h2>Find what fits your day</h2>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.id}>
              <img src={category.image} alt={category.name} />
              <div>
                <h3>{category.name}</h3>
                <p>{category.itemCount}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="newsletter" className="newsletter">
        <div>
          <p className="section-heading__eyebrow">Stay updated</p>
          <h2>Get fresh arrivals and exclusive offers.</h2>
        </div>

        <form className="newsletter__form">
          <input type="email" placeholder="Enter your email" aria-label="Email" />
          <button className="button button--primary" type="submit">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  )
}

// Export Home so App.jsx can render it.
export default Home
