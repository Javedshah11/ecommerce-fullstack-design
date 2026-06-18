import { Link } from 'react-router-dom'

function DiscountBanner() {
  return (
    <section className="mx-auto my-5 max-w-7xl px-4">
      <div className="flex flex-col justify-between gap-4 rounded-md bg-linear-to-r from-blue-600 to-blue-500 p-6 text-white md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-semibold">Super discount on more than 100 USD</h2>
          <p className="mt-1 text-sm text-blue-100">
            Explore featured catalog deals and complete checkout from one polished shopping flow.
          </p>
        </div>
        <Link className="w-fit rounded-md bg-orange-400 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-500" to="/products-grid">
          Shop now
        </Link>
      </div>
    </section>
  )
}

export default DiscountBanner
