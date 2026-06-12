import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../api/products'
import CategorySidebar from '../components/CategorySidebar'
import Newsletter from '../components/Newsletter'
import ProductCard from '../components/ProductCard'
import categories, { regions } from '../data/categories'
import useProducts from '../hooks/useProducts'
import { getProductId, getProductName } from '../utils/product'

const serviceCards = [
  {
    title: 'Live product catalog',
    text: 'Browse products with current stock, pricing, category, and fulfillment-ready details.',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Fast catalog discovery',
    text: 'Search, filter, and compare products across categories from one clean catalog.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Secure checkout flow',
    text: 'Move from cart to checkout with a polished order summary and saved order history.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Reliable support',
    text: 'Keep customer details, orders, and purchase activity organized in one place.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
  },
]

function CategoryTile({ category, product }) {
  return (
    <Link
      className="group relative min-h-44 overflow-hidden rounded-md border border-slate-200 bg-white"
      to={`/products-grid?category=${encodeURIComponent(category)}`}
    >
      <img
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105"
        src={product?.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80'}
        alt={category}
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="text-lg font-semibold">{category}</h3>
        <p className="mt-1 text-sm text-white/80">Shop category</p>
      </div>
    </Link>
  )
}

function DealCard({ product }) {
  return (
    <Link className="border-r border-slate-200 p-5 text-center hover:bg-slate-50" to={`/product/${getProductId(product)}`}>
      <img className="mx-auto h-32 w-32 object-contain" src={product.image} alt={getProductName(product)} />
      <p className="mt-4 line-clamp-2 text-base font-medium text-slate-900">{getProductName(product)}</p>
      <span className="mt-3 inline-flex rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
        Featured
      </span>
    </Link>
  )
}

function PromoSection({ title, image, products }) {
  return (
    <section className="mx-auto grid max-w-295 overflow-hidden rounded-md border border-slate-200 bg-white lg:grid-cols-[280px_1fr]">
      <div className="relative min-h-64 bg-slate-900 p-6 text-white">
        <img className="absolute inset-0 h-full w-full object-cover opacity-70" src={image} alt={title} />
        <div className="relative">
          <h2 className="max-w-52 text-2xl font-semibold leading-tight">{title}</h2>
          <Link className="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm" to="/products-grid">
            Browse products
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((product) => (
          <Link className="relative min-h-36 border-b border-r border-slate-200 p-4 hover:bg-slate-50" key={getProductId(product)} to={`/product/${getProductId(product)}`}>
            <h3 className="max-w-40 text-base font-semibold text-slate-900">{getProductName(product).split(' ').slice(0, 4).join(' ')}</h3>
            <p className="mt-3 text-sm leading-tight text-slate-500">From<br />USD {product.price}</p>
            <img className="absolute bottom-3 right-3 h-20 w-20 object-contain" src={product.image} alt={getProductName(product)} />
          </Link>
        ))}
      </div>
    </section>
  )
}


function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [inquiryMessage, setInquiryMessage] = useState('')
  const [error, setError] = useState('')
  const { products, error: productsError, retry } = useProducts({ limit: 50, sort: 'newest' })

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        setError('')
        const featured = await getFeaturedProducts()
        setFeaturedProducts(featured)
      } catch {
        setError('Featured products could not be loaded.')
      }
    }

    loadFeaturedProducts()
  }, [])

  const productsByCategory = useMemo(() => {
    return categories.reduce((groups, category) => {
      groups[category] = products.filter((product) => product.category === category)
      return groups
    }, {})
  }, [products])

  const heroProduct = featuredProducts[0] || products[0]
  const dealProducts = featuredProducts.slice(0, 5)
  const techProducts = products.filter((product) => /electronics|tech|computer/i.test(product.category))
  const homeProducts = products.filter((product) => /home|tools|outdoor/i.test(product.category))

  function handleInquirySubmit(event) {
    event.preventDefault()
    setInquiryMessage('Product request prepared successfully.')
    event.currentTarget.reset()
  }

  return (
    <main className="bg-slate-100">
      <div className="mx-auto max-w-295 px-4 py-4 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.slice(0, 7).map((category) => (
            <Link className="shrink-0 rounded-md bg-slate-200 px-3 py-2 text-sm text-blue-700" key={category} to={`/products-grid?category=${encodeURIComponent(category)}`}>
              {category}
            </Link>
          ))}
        </div>
      </div>

      {error && (
        <div className="mx-auto max-w-295 px-4 pt-5">
          <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>
        </div>
      )}
      {productsError && (
        <div className="mx-auto max-w-295 px-4 pt-5">
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            <p>{productsError}</p>
            <button className="mt-3 rounded-md bg-red-600 px-4 py-2 text-white" type="button" onClick={retry}>
              Retry
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto grid max-w-295 gap-3 px-4 py-5 lg:grid-cols-[250px_1fr_220px]">
        <CategorySidebar />

        <div className="relative min-h-96 overflow-hidden rounded-md bg-slate-900 p-8 text-white md:p-12">
          {heroProduct && (
            <img
              className="absolute inset-y-0 right-0 hidden h-full w-3/5 object-cover opacity-80 md:block"
              src={heroProduct.image}
              alt={getProductName(heroProduct)}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-slate-900/10" />
          <div className="relative z-10 max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Professional ecommerce marketplace</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Source quality products from one modern storefront
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-200">
              Browse real catalog items, compare details, add products to cart, and complete checkout with order history.
            </p>
            <Link className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700" to="/products-grid">
              Shop catalog
            </Link>
          </div>
        </div>

        <aside className="hidden space-y-3 lg:block">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Account center</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Save your profile and keep track of recent orders.</p>
            <Link className="mt-4 block rounded-md bg-blue-600 py-2 text-center text-sm font-semibold text-white" to="/profile">
              Open profile
            </Link>
          </div>
          <Link className="block rounded-md bg-orange-500 p-4 text-sm font-semibold text-white" to="/products-grid?featured=true">
            View featured deals
          </Link>
          <Link className="block rounded-md bg-teal-600 p-4 text-sm font-semibold text-white" to="/orders">
            Track order history
          </Link>
        </aside>
      </section>

      <section className="mx-auto max-w-295 px-4 pb-6">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">Shop by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <CategoryTile category={category} key={category} product={productsByCategory[category]?.[0]} />
          ))}
        </div>
      </section>

      {dealProducts.length > 0 && (
        <section className="mx-auto max-w-295 px-4 pb-6">
          <div className="grid overflow-hidden rounded-md border border-slate-200 bg-white lg:grid-cols-[280px_1fr]">
            <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r">
              <h2 className="text-xl font-semibold text-slate-900">Deals and offers</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">Products with active price savings from the catalog.</p>
              <Link className="mt-5 inline-flex rounded-md border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600" to="/products-grid?featured=true">
                View all deals
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {dealProducts.map((product) => (
                <DealCard key={getProductId(product)} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="space-y-5 px-4 pb-6">
        {homeProducts.length > 0 && (
          <PromoSection
            title="Home, tools and outdoor essentials"
            image="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=900&q=80"
            products={homeProducts}
          />
        )}
        {techProducts.length > 0 && (
          <PromoSection
            title="Consumer electronics and smart devices"
            image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
            products={techProducts}
          />
        )}
      </div>

      <section className="mx-auto max-w-295 px-4 pb-8">
        <div className="grid min-h-96 gap-6 rounded-md bg-slate-900 p-8 text-white md:grid-cols-2 md:p-10">
          <div>
            <h2 className="max-w-lg text-3xl font-semibold leading-tight md:text-4xl">Send a product request</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
              Share the item, quantity, and buying details you need from the current product catalog.
            </p>
          </div>
          <form className="rounded-md bg-white p-6 text-slate-900 shadow-lg" onSubmit={handleInquirySubmit}>
            <h3 className="text-2xl font-semibold">Request a quote</h3>
            <input className="mt-6 w-full rounded-md border border-slate-200 px-4 py-3 text-base" placeholder="Product name" required />
            <textarea className="mt-5 min-h-24 w-full rounded-md border border-slate-200 px-4 py-3 text-base" placeholder="Buying requirements" required />
            <div className="mt-3 flex gap-2">
              <input className="w-48 rounded-md border border-slate-200 px-4 py-3 text-base" min="1" placeholder="Quantity" required type="number" />
              <select className="rounded-md border border-slate-200 px-4 py-3 text-base">
                <option>Pcs</option>
                <option>Boxes</option>
                <option>Kg</option>
              </select>
            </div>
            <button className="mt-6 rounded-md bg-blue-600 px-5 py-3 text-base font-semibold text-white" type="submit">
              Send request
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={getProductId(product)} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-295 px-4 pb-10">
        <h2 className="mb-6 text-3xl font-semibold text-slate-900">Marketplace services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service) => (
            <article className="overflow-hidden rounded-md border border-slate-200 bg-white" key={service.title}>
              <img className="h-36 w-full object-cover" src={service.image} alt={service.title} />
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-7 text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{service.text}</p>
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
