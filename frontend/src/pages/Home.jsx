// Home displays the landing section users see first.
function Home() {
  return (
    <main id="home" className="home-page">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Simple shopping, smart choices</p>
          <h1>Welcome to ShopEase</h1>
          <p className="hero__subtitle">
            Discover everyday products with a clean, beginner-friendly React
            shopping experience.
          </p>
          <a className="button button--primary" href="#products">
            Shop Now
          </a>
        </div>
      </section>
    </main>
  )
}

// Export Home so App.jsx can render it.
export default Home
