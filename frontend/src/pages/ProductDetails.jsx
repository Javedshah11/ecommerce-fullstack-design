import { Link, useParams } from 'react-router-dom'
import DiscountBanner from '../components/DiscountBanner'
import ProductCard from '../components/ProductCard'
import SupplierCard from '../components/SupplierCard'
import products from '../data/products'

function ProductDetails() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id)) || products[0]
  const gallery = products.slice(0, 6)

  return (
    <main className="bg-slate-100 px-4 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-sm text-slate-500">
          Home &gt; Products &gt; {product.category}
        </div>

        <section className="grid gap-5 rounded-md border border-slate-200 bg-white p-4 lg:grid-cols-[380px_1fr_280px]">
          <div>
            <div className="rounded-md border border-slate-200 p-4">
              <img className="mx-auto aspect-square w-full object-contain" src={product.image} alt={product.title} />
            </div>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {gallery.map((item) => (
                <img className="aspect-square rounded-md border border-slate-200 object-cover p-1" key={item.id} src={item.image} alt={item.title} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-green-600">{product.verified ? 'In stock' : 'Limited stock'}</p>
            <h1 className="mt-2 text-xl font-semibold text-slate-900 md:text-2xl">{product.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-orange-500">{product.rating}</span>
              <span className="text-slate-500">{product.reviews} reviews</span>
              <span className="text-slate-500">{product.sold} sold</span>
            </div>

            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-md bg-orange-50 text-sm">
              {[50, 100, 700].map((qty, index) => (
                <div className="border-r border-orange-100 p-4" key={qty}>
                  <p className="text-lg font-semibold text-red-600">${(product.price - index * 12).toFixed(2)}</p>
                  <p className="text-slate-500">{qty}-{qty + 49} pcs</p>
                </div>
              ))}
            </div>

            <div className="mt-5 divide-y divide-slate-200 text-sm">
              {Object.entries(product.specs).map(([key, value]) => (
                <div className="grid grid-cols-[130px_1fr] py-3" key={key}>
                  <span className="text-slate-500">{key}</span>
                  <span className="text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <SupplierCard product={product} />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="rounded-md border border-slate-200 bg-white">
            <div className="flex gap-6 border-b border-slate-200 px-5 text-sm font-medium">
              {['Description', 'Reviews', 'Shipping', 'About seller'].map((tab, index) => (
                <button className={`py-4 ${index === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`} key={tab} type="button">
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-5 text-sm leading-7 text-slate-600">
              <p>{product.description}</p>
              <p className="mt-3">
                This static product detail view mirrors a marketplace product page with price tiers,
                supplier information, specifications, tabs, and related product suggestions.
              </p>
            </div>
          </div>

          <aside className="rounded-md border border-slate-200 bg-white p-4">
            <h3 className="font-semibold text-slate-900">You may like</h3>
            <div className="mt-4 space-y-3">
              {products.slice(4, 8).map((item) => (
                <Link className="flex gap-3" key={item.id} to={`/product/${item.id}`}>
                  <img className="h-14 w-14 rounded-md border border-slate-200 object-cover" src={item.image} alt={item.title} />
                  <div>
                    <p className="line-clamp-2 text-sm text-slate-700">{item.title}</p>
                    <p className="text-sm text-slate-500">${item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-5">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Related products</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 5).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
      <DiscountBanner />
    </main>
  )
}

export default ProductDetails
