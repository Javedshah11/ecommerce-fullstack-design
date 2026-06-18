import { Link } from 'react-router-dom'
import { getOrders } from '../utils/orders'

function Orders() {
  const orders = getOrders()

  return (
    <main className="bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-5xl rounded-md border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">My orders</h1>
            <p className="mt-1 text-sm text-slate-500">Track purchases, invoices, and delivery status.</p>
          </div>
          <Link className="rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white" to="/products-grid">
            Shop again
          </Link>
        </div>

        {orders.length === 0 && (
          <div className="mt-5 rounded-md bg-slate-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-900">No orders yet</h2>
            <p className="mt-2 text-sm text-slate-500">Orders you place at checkout will appear here.</p>
          </div>
        )}

        <div className="mt-4 divide-y divide-slate-200">
          {orders.map((order) => (
            <article className="grid gap-3 py-4 md:grid-cols-[1.2fr_1fr_1fr_auto]" key={order.id}>
              <div>
                <p className="font-semibold text-slate-900">{order.id}</p>
                <p className="text-sm text-slate-500">{order.date}</p>
              </div>
              <p className="text-sm text-slate-600">{order.items.length} items</p>
              <p className="text-sm font-semibold text-slate-900">${order.total.toFixed(2)}</p>
              <span className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                {order.status}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Orders
