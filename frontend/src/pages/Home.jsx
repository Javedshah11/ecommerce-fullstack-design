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
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
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
    <main id="home" className="overflow-x-hidden">
      <section className="relative bg-gradient-to-br from-white via-teal-50 to-slate-100 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 xl:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 xl:gap-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-wide text-teal-700">
              New season essentials
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl xl:text-7xl">
              Shop smarter with curated everyday products.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover quality tech, lifestyle, and home essentials in one clean
              shopping experience built for comfort and confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-teal-500 px-7 py-4 text-base font-black text-white shadow-xl shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-600"
                href="#products"
              >
                Shop Now
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-black text-slate-900 transition hover:border-teal-300 hover:text-teal-700"
                href="#categories"
              >
                Browse Categories
              </a>
            </div>
          </div>

          <div className="relative" aria-label="Featured ecommerce collection">
            <img
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl shadow-slate-900/20 sm:aspect-[16/11] lg:aspect-[4/5]"
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80"
              alt="Person shopping for modern lifestyle products"
            />
            <div className="absolute bottom-4 left-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl shadow-slate-900/15 backdrop-blur sm:bottom-6 sm:left-6">
              <strong className="block text-2xl font-black leading-none text-slate-950">
                8k+
              </strong>
              <span className="text-sm font-bold text-slate-600">
                happy shoppers
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-7xl">
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-teal-700">
            Featured products
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Popular picks this week
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Handpicked products with simple cards, clean props, and reusable
            React components.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <section
        id="categories"
        className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto mb-10 max-w-7xl">
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-teal-700">
            Shop by category
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Find what fits your day
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              className="group relative min-h-72 overflow-hidden rounded-3xl shadow-lg shadow-slate-900/10"
              key={category.id}
            >
              <img
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                src={category.image}
                alt={category.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-black text-white">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm font-bold text-teal-100">
                  {category.itemCount}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="newsletter"
        className="px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 rounded-3xl bg-slate-950 p-6 shadow-2xl shadow-slate-900/20 sm:p-8 md:grid-cols-2 lg:p-12">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-teal-300">
              Stay updated
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Get fresh arrivals and exclusive offers.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Join the ShopEase list for product drops, seasonal picks, and
              shopping inspiration.
            </p>
          </div>

          <form className="flex flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row">
            <input
              className="min-h-12 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
            />
            <button
              className="rounded-xl bg-teal-500 px-6 py-3 font-black text-white transition hover:bg-teal-600"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

// Export Home so App.jsx can render it.
export default Home
