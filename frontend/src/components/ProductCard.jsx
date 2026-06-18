import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { getProductId, getProductName } from '../utils/product'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const productId = getProductId(product)
  const productName = getProductName(product)

  return (
    <article className="group rounded-md border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link className="block bg-white p-4" to={`/product/${productId}`}>
        <img
          className="mx-auto aspect-square w-full max-w-44 object-contain transition group-hover:scale-105"
          src={product.image}
          alt={productName}
        />
      </Link>
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-slate-900">${product.price.toFixed(2)}</p>
            <p className="text-sm text-slate-500">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
          </div>
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
        <Link className="mt-2 line-clamp-2 block text-sm leading-6 text-slate-700 hover:text-blue-600" to={`/product/${productId}`}>
          {productName}
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="font-medium text-blue-600">{product.category}</span>
          {product.featured && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">Featured</span>}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
