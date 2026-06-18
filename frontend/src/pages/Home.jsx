import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import CategorySidebar from '../components/CategorySidebar'
import Newsletter from '../components/Newsletter'
import ProductCard from '../components/ProductCard'
import categories, { regions } from '../data/categories'
import products from '../data/products'
import { getProductId } from '../utils/product'

const deals = [
  { label: 'Smart watches', discount: '-25%', image: products[2].image },
  { label: 'Laptops', discount: '-15%', image: products[8].image },
  { label: 'GoPro cameras', discount: '-40%', image: products[1].image },
  { label: 'Headphones', discount: '-25%', image: products[3].image },
  { label: 'Canon cameras', discount: '-25%', image: products[0].image },
]

const serviceCards = [
  { title: 'Source from Industry Hubs', icon: 'M21 21l-5.2-5.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z' },
  { title: 'Customize Your Products', icon: 'M5 7h14M7 7v12h10V7M9 7V5h6v2M9 11h6' },
  { title: 'Fast, reliable shipping by ocean or air', icon: 'M3 12h18M3 12l7-7M3 12l7 7' },
  { title: 'Product monitoring and inspection', icon: 'M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z' },
]

const recommendedItems = [
  { title: 'T-shirts with multiple colors, for men', price: 10.3, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=600&q=80' },
  { title: 'Jeans shorts for men blue color', price: 10.3, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80' },
  { title: 'Brown winter coat medium size', price: 12.5, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80' },
  { title: 'Jeans bag for travel for men', price: 34, image: products[9].image },
  { title: 'Leather wallet', price: 99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80' },
  { title: 'Canon camera black, 100x zoom', price: 9.99, image: products[0].image },
  { title: 'Headset for gaming with mic', price: 8.99, image: products[3].image },
  { title: 'Smartwatch silver color modern', price: 10.3, image: products[2].image },
  { title: 'Blue wallet for men leather material', price: 10.3, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80' },
  { title: 'Jeans bag for travel for men', price: 80.95, image: products[8].image },
]

function PromoSection({ title, image, items }) {
  const shownItems = [...items, ...products].slice(0, 8)

  return (
    <section className="mx-auto grid max-w-295 overflow-hidden rounded-md border border-slate-200 bg-white lg:grid-cols-[280px_1fr]">
      <div className="relative min-h-64 bg-slate-900 p-6 text-slate-950">
        <img className="absolute inset-0 h-full w-full object-cover opacity-85" src={image} alt="" />
        <div className="relative">
          <h2 className="max-w-44 text-2xl font-semibold leading-tight">{title}</h2>
          <Link className="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-base font-medium text-slate-900 shadow-sm" to="/products-grid">
            Source now
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {shownItems.map((product, index) => (
          <Link className="relative min-h-32 border-b border-r border-slate-200 p-4 hover:bg-slate-50" key={`${product.id}-${index}`} to={`/product/${product.id}`}>
            <h3 className="max-w-36 text-lg font-medium text-slate-900">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
            <p className="mt-3 text-base leading-tight text-slate-400">From<br />USD {product.price}</p>
            <img className="absolute bottom-3 right-3 h-20 w-20 object-contain" src={product.image} alt={product.title} />
          </Link>
        ))}
      </div>
    </section>
  )
}

function RecommendedCard({ item }) {
  return (
    <Link className="rounded-md border border-slate-200 bg-white p-4 transition hover:shadow-md" to="/products-grid">
      <img className="mx-auto h-48 w-full object-contain" src={item.image} alt={item.title} />
      <p className="mt-5 text-lg font-medium text-slate-950">${item.price.toFixed(2)}</p>
      <p className="mt-2 text-base leading-7 text-slate-400">{item.title}</p>
    </Link>
  )
}

function Home() {
  const [userMessage, setUserMessage] = useState('')
  const [inquiryMessage, setInquiryMessage] = useState('')
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [featuredError, setFeaturedError] = useState('')

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await getProducts({ featured: true })
        setFeaturedProducts(data)
      } catch {
        setFeaturedError('Featured products could not be loaded.')
      }
    }

    loadFeaturedProducts()
  }, [])

  function handleInquirySubmit(event) {
    event.preventDefault()
    setInquiryMessage('Inquiry sent. Suppliers will contact you with offers.')
    event.currentTarget.reset()
  }

  return (
    <main className="bg-slate-100">
      <div className="mx-auto max-w-295 px-4 py-4 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.slice(0, 7).map((category) => (
            <Link className="shrink-0 rounded-md bg-slate-200 px-3 py-2 text-sm text-blue-700" key={category} to="/products">
              {category}
            </Link>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-295 gap-3 px-4 py-5 lg:grid-cols-[250px_1fr_200px]">
        <CategorySidebar />

        <div className="relative min-h-90 overflow-hidden rounded-md bg-[#9ee4d2] p-12">
          <div className="relative z-10 max-w-md">
            <p className="text-lg text-slate-800">Latest trending</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950 md:text-4xl">
              Electronic items
            </h1>
            <Link className="mt-5 inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm" to="/products-grid">
              Learn more
            </Link>
          </div>
          <img
            className="absolute inset-y-0 right-0 hidden h-full w-3/5 object-cover md:block"
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80"
            alt="Electronics marketplace"
          />
        </div>

        <aside className="hidden space-y-3 lg:block">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">U</span>
              <p className="text-sm text-slate-900">Hi, user let's get started</p>
            </div>
            <button
              className="mt-3 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white"
              type="button"
              onClick={() => setUserMessage('Registration preview opened.')}
            >
              Join now
            </button>
            <button
              className="mt-2 w-full rounded-md bg-white py-2 text-sm font-semibold text-blue-600"
              type="button"
              onClick={() => setUserMessage('Login preview opened.')}
            >
              Log in
            </button>
            {userMessage && (
              <p className="mt-2 text-xs font-medium text-blue-700">{userMessage}</p>
            )}
          </div>
          <div className="rounded-md bg-orange-400 p-4 text-sm font-medium text-white">
            Get US $10 off with a new supplier
          </div>
          <div className="rounded-md bg-teal-500 p-4 text-sm font-medium text-white">
            Send quotes with supplier preferences
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-295 px-4 pb-5">
        <div className="grid overflow-hidden rounded-md border border-slate-200 bg-white lg:grid-cols-[280px_1fr]">
          <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r">
            <h2 className="text-xl font-semibold text-slate-900">Deals and offers</h2>
            <p className="mt-1 text-sm text-slate-500">Hygiene equipments</p>
            <div className="mt-5 flex gap-2">
              {['04', '13', '34', '56'].map((item, index) => (
                <div className="rounded-md bg-slate-700 px-3 py-2 text-center text-white" key={item}>
                  <p className="font-semibold">{item}</p>
                  <p className="text-xs">{['Days', 'Hour', 'Min', 'Sec'][index]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {deals.map((deal) => (
              <Link className="border-r border-slate-200 p-6 text-center hover:bg-slate-50" key={deal.label} to="/products-grid">
                <img className="mx-auto h-32 w-32 object-contain" src={deal.image} alt={deal.label} />
                <p className="mt-4 text-lg text-slate-900">{deal.label}</p>
                <span className="mt-3 inline-flex rounded-full bg-red-100 px-4 py-1 text-base font-medium text-red-600">
                  {deal.discount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-5 px-4 pb-5">
        <PromoSection
          title="Home and outdoor"
          image="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=900&q=80"
          items={products.slice(5, 9)}
        />
        <PromoSection
          title="Consumer electronics and gadgets"
          image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
          items={products.slice(0, 4)}
        />
      </div>

      <section className="mx-auto max-w-295 px-4 pb-8">
        <div className="grid min-h-96 gap-6 rounded-md bg-linear-to-r from-blue-600 to-cyan-500 p-10 text-white md:grid-cols-2">
          <div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight">An easy way to send requests to all suppliers</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
          <form className="rounded-md bg-white p-6 text-slate-900 shadow-lg" onSubmit={handleInquirySubmit}>
            <h3 className="text-2xl font-semibold">Send quote to suppliers</h3>
            <input className="mt-6 w-full rounded-md border border-slate-200 px-4 py-3 text-lg" placeholder="What item you need?" required />
            <textarea className="mt-5 min-h-24 w-full rounded-md border border-slate-200 px-4 py-3 text-lg" placeholder="Type more details" required />
            <div className="mt-3 flex gap-2">
              <input className="w-48 rounded-md border border-slate-200 px-4 py-3 text-lg" min="1" placeholder="Quantity" required type="number" />
              <select className="rounded-md border border-slate-200 px-4 py-3 text-lg">
                <option>Pcs</option>
                <option>Boxes</option>
                <option>Kg</option>
              </select>
            </div>
            <button className="mt-6 rounded-md bg-blue-600 px-5 py-3 text-lg font-medium text-white" type="submit">
              Send inquiry
            </button>
            {inquiryMessage && (
              <p className="mt-3 rounded-md bg-green-50 p-3 text-sm text-green-700">
                {inquiryMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-295 px-4 pb-10">
        <h2 className="mb-6 text-3xl font-semibold text-slate-900">Featured products</h2>
        {featuredError && (
          <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{featuredError}</p>
        )}
        {!featuredError && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={getProductId(product)} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-295 px-4 pb-10">
        <h2 className="mb-6 text-3xl font-semibold text-slate-900">Recommended items</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {recommendedItems.map((item) => (
            <RecommendedCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-295 px-4 pb-10">
        <h2 className="mb-6 text-3xl font-semibold text-slate-900">Our extra services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service, index) => (
            <article className="overflow-hidden rounded-md border border-slate-200 bg-white" key={service.title}>
              <div className="relative">
                <img className="h-32 w-full object-cover brightness-75" src={products[index].image} alt={service.title} />
                <span className="absolute -bottom-8 right-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-slate-900">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                  </svg>
                </span>
              </div>
              <div className="p-5 pt-7">
                <h3 className="max-w-56 text-xl font-medium leading-7 text-slate-900">{service.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-295 px-4 pb-12">
        <h2 className="mb-8 text-3xl font-semibold text-slate-900">Suppliers by region</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-3 lg:grid-cols-5">
          {regions.map((region) => (
            <div className="flex items-center gap-3" key={region.country}>
              <img className="h-5 w-8 object-cover" src={region.flag} alt={region.country} />
              <div>
                <p className="text-lg text-slate-900">{region.country}</p>
                <p className="text-base text-slate-400">{region.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </main>
  )
}

export default Home
