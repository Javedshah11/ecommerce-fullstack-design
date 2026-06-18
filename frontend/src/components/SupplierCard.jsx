import { useState } from 'react'

function SupplierCard({ product }) {
  const [message, setMessage] = useState('')
  const supplier = product.supplier || 'Brand Supply Co.'

  return (
    <aside className="rounded-md border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-100 text-lg font-semibold text-cyan-700">
          {supplier.slice(0, 1)}
        </span>
        <div>
          <p className="text-sm text-slate-500">Supplier</p>
          <h3 className="font-semibold text-slate-900">{supplier}</h3>
        </div>
      </div>

      <div className="space-y-2 py-4 text-sm text-slate-600">
        <p>{product.location}</p>
        <p>{product.verified ? 'Verified Seller' : 'Unverified Seller'}</p>
        <p>Worldwide shipping</p>
      </div>

      <button
        className="w-full rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        type="button"
        onClick={() => setMessage('Inquiry request prepared for this supplier.')}
      >
        Send inquiry
      </button>
      <button
        className="mt-2 w-full rounded-md border border-slate-200 bg-white py-2.5 text-sm font-semibold text-blue-600"
        type="button"
        onClick={() => setMessage(`${supplier} profile is selected.`)}
      >
        Seller profile
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
