import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { getProductId, getProductName } from '../utils/product'

function ProductListItem({ product }) {
  const { addToCart } = useCart()
  const productId = getProductId(product)
  const productName = getProductName(product)

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
            className="rounded-md border border-slate-200 p-2 text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-300"
            type="button"
            aria-label="Add to cart"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l2.4 12.2A2 2 0 0 0 9.36 17h7.78a2 2 0 0 0 1.95-1.57L21 7H6" />
            </svg>
          </button>
        </div>
        <div>
          <span className="text-xl font-semibold text-slate-900">${product.price.toFixed(2)}</span>
          <span className="ml-2 text-sm text-slate-500">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-medium text-blue-600">{product.category}</span>
          {product.featured && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">Featured</span>}
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
