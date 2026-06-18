import { useState } from 'react'
import { getProductName } from '../utils/product'

function SupplierCard({ product }) {
  const [message, setMessage] = useState('')
  const productName = getProductName(product)

  return (
    <aside className="rounded-md border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-100 text-lg font-semibold text-cyan-700">
          {product.category.slice(0, 1)}
        </span>
        <div>
          <p className="text-sm text-slate-500">Product category</p>
          <h3 className="font-semibold text-slate-900">{product.category}</h3>
        </div>
      </div>

      <div className="space-y-2 py-4 text-sm text-slate-600">
        <p>{productName}</p>
        <p>{product.stock > 0 ? `${product.stock} units available` : 'Currently out of stock'}</p>
        <p>{product.featured ? 'Featured product' : 'Standard catalog product'}</p>
      </div>

      <button
        className="w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        type="button"
        onClick={() => setMessage('Product inquiry prepared.')}
      >
        Send inquiry
      </button>
      <button
        className="mt-2 w-full rounded-md border border-slate-200 bg-white py-2.5 text-sm font-semibold text-blue-600"
        type="button"
        onClick={() => setMessage(`${product.category} catalog selected.`)}
      >
        View category
      </button>
      {message && (
        <p className="mt-3 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
          {message}
        </p>
      )}
    </aside>
  )
}

export default SupplierCard
