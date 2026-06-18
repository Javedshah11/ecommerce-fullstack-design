import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getProductId, getProductName, getProductOldPrice } from '../utils/product'

function ProductListItem({ product }) {
  const [isSaved, setIsSaved] = useState(false)
  const productId = getProductId(product)
  const productName = getProductName(product)
  const oldPrice = getProductOldPrice(product)

  return (
    <article className="grid grid-cols-1 gap-4 rounded-md border border-slate-200 bg-white p-4 sm:grid-cols-[180px_1fr]">
      <Link className="flex items-center justify-center rounded-md bg-slate-50 p-4" to={`/product/${productId}`}>
        <img className="aspect-square w-full max-w-40 object-contain" src={product.image} alt={productName} />
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <Link className="text-lg font-semibold text-slate-900 hover:text-blue-600" to={`/product/${productId}`}>
            {productName}
          </Link>
          <button
            className={`rounded-md border p-2 text-blue-600 hover:bg-blue-50 ${isSaved ? 'border-blue-200 bg-blue-50' : 'border-slate-200'}`}
            type="button"
            aria-label={isSaved ? 'Remove from wishlist' : 'Wishlist'}
            onClick={() => setIsSaved((current) => !current)}
          >
            <svg className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.35-1.9-4.25-4.25-4.25A5.1 5.1 0 0 0 12 7a5.1 5.1 0 0 0-4.75-3C4.9 4 3 5.9 3 8.25c0 6.5 9 11.75 9 11.75s9-5.25 9-11.75Z" />
            </svg>
          </button>
        </div>
        <div>
          <span className="text-xl font-semibold text-slate-900">${product.price.toFixed(2)}</span>
          <span className="ml-2 text-sm text-slate-400 line-through">${oldPrice.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-medium text-orange-500">{product.rating}</span>
          <span className="text-slate-500">{product.reviews} reviews</span>
          <span className="text-slate-500">{product.sold} sold</span>
          <span className="font-medium text-green-600">{product.shipping}</span>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">{product.description}</p>
        <Link className="text-sm font-semibold text-blue-600" to={`/product/${productId}`}>
          View details
        </Link>
      </div>
    </article>
  )
}

export default ProductListItem
