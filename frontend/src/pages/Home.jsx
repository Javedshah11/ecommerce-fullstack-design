import { Link } from 'react-router-dom'
import CategorySidebar from '../components/CategorySidebar'
import ProductCard from '../components/ProductCard'
import Newsletter from '../components/Newsletter'
import categories, { regions } from '../data/categories'
import products from '../data/products'

const deals = [
  { label: 'Smart watches', discount: '-25%', image: products[2].image },
  { label: 'Laptops', discount: '-15%', image: products[8].image },
  { label: 'GoPro cameras', discount: '-40%', image: products[1].image },
  { label: 'Headphones', discount: '-25%', image: products[3].image },
  { label: 'Canon cameras', discount: '-25%', image: products[0].image },
]

const serviceCards = [
  'Source from industry hubs',
  'Customize your products',
  'Fast, reliable shipping',
  'Product inspection',
]

function PromoSection({ title, image, items }) {
  return (
    <section className="mx-auto grid max-w-7xl overflow-hidden rounded-md border border-slate-200 bg-white lg:grid-cols-[280px_1fr]">
      <div className="relative min-h-52 bg-slate-900 p-6 text-white">
        <img className="absolute inset-0 h-full w-full object-cover opacity-45" src={image} alt="" />
        <div className="relative">
          <h2 className="max-w-44 text-xl font-semibold">{title}</h2>
          <Link className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900" to="/products-grid">
            Source now
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <Link className="border-b border-r border-slate-200 p-4 hover:bg-slate-50" key={product.id} to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-slate-900">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
            <p className="mt-1 text-xs text-slate-500">From USD {product.price}</p>
            <img className="ml-auto mt-2 h-20 w-20 object-contain" src={product.image} alt={product.title} />
          </Link>
        ))}
      </div>
    </section>
  )
}

function Home() {
  return (
    <main className="bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.slice(0, 7).map((category) => (
            <Link className="shrink-0 rounded-md bg-slate-200 px-3 py-2 text-sm text-blue-700" key={category} to="/products">
              {category}
            </Link>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[250px_1fr_220px]">
        <CategorySidebar />

        <div className="relative overflow-hidden rounded-md bg-gradient-to-r from-cyan-100 to-blue-100 p-8">
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
            className="absolute bottom-0 right-0 hidden h-full w-1/2 object-cover md:block"
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=80"
            alt="Electronics marketplace"
          />
        </div>

        <aside className="hidden space-y-3 lg:block">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">U</span>
              <p className="text-sm text-slate-900">Hi, user let's get started</p>
            </div>
            <button className="mt-3 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white" type="button">Join now</button>
            <button className="mt-2 w-full rounded-md bg-white py-2 text-sm font-semibold text-blue-600" type="button">Log in</button>
          </div>
          <div className="rounded-md bg-orange-400 p-4 text-sm font-medium text-white">
            Get US $10 off with a new supplier
          </div>
          <div className="rounded-md bg-teal-500 p-4 text-sm font-medium text-white">
            Send quotes with supplier preferences
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-5">
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
              <Link className="border-r border-slate-200 p-4 text-center hover:bg-slate-50" key={deal.label} to="/products-grid">
                <img className="mx-auto h-24 w-24 object-contain" src={deal.image} alt={deal.label} />
                <p className="mt-2 text-sm text-slate-900">{deal.label}</p>
                <span className="mt-2 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
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

      <section className="mx-auto max-w-7xl px-4 pb-5">
        <div className="grid gap-6 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">An easy way to send requests to all suppliers</h2>
            <p className="mt-3 max-w-md text-sm text-blue-100">
              Send your request and suppliers will respond with current prices and shipping options.
            </p>
          </div>
          <form className="rounded-md bg-white p-5 text-slate-900 shadow-lg">
            <h3 className="font-semibold">Send quote to suppliers</h3>
            <input className="mt-4 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="What item you need?" />
            <textarea className="mt-3 min-h-20 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="Type more details" />
            <div className="mt-3 flex gap-2">
              <input className="w-24 rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="Quantity" />
              <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option>Pcs</option>
              </select>
            </div>
            <button className="mt-4 rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white" type="button">
              Send inquiry
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-5">
        <h2 className="mb-5 text-xl font-semibold text-slate-900">Recommended items</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-5">
        <h2 className="mb-5 text-xl font-semibold text-slate-900">Our extra services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((service, index) => (
            <article className="overflow-hidden rounded-md border border-slate-200 bg-white" key={service}>
              <img className="h-28 w-full object-cover" src={products[index].image} alt={service} />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{service}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <h2 className="mb-5 text-xl font-semibold text-slate-900">Suppliers by region</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {regions.map((region) => (
            <div className="flex items-center gap-3" key={region.country}>
              <span className="h-7 w-10 rounded-sm bg-slate-200" />
              <div>
                <p className="text-sm text-slate-900">{region.country}</p>
                <p className="text-xs text-slate-500">{region.domain}</p>
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
