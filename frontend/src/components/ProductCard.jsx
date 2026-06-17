import { Link } from 'react-router-dom'
import { useState } from 'react'

function ProductCard({ product }) {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <article className="group rounded-md border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link className="block bg-white p-4" to={`/product/${product.id}`}>
        <img
          className="mx-auto aspect-square w-full max-w-44 object-contain transition group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />
      </Link>
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-slate-900">${product.price.toFixed(2)}</p>
            <p className="text-sm text-slate-400 line-through">${product.oldPrice.toFixed(2)}</p>
          </div>
          <button
            className={`rounded-md border p-2 hover:bg-blue-50 ${isSaved ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-slate-200 text-blue-600'}`}
            type="button"
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={() => setIsSaved((current) => !current)}
          >
            <svg className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.35-1.9-4.25-4.25-4.25A5.1 5.1 0 0 0 12 7a5.1 5.1 0 0 0-4.75-3C4.9 4 3 5.9 3 8.25c0 6.5 9 11.75 9 11.75s9-5.25 9-11.75Z" />
            </svg>
          </button>
        </div>
        <Link className="mt-2 line-clamp-2 block text-sm leading-6 text-slate-700 hover:text-blue-600" to={`/product/${product.id}`}>
          {product.title}
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="font-medium text-orange-500">{product.rating}</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">{product.shipping}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
