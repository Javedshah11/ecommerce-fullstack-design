import { useEffect, useMemo, useState } from 'react'
import { getAdminStats } from '../api/admin'
import { getAdminOrders, updateOrderStatus } from '../api/orders'
import { createProduct, deleteProduct, updateProduct } from '../api/products'
import { createAdminUser, deleteUser, getUsers } from '../api/users'
import ApiError from '../components/ApiError'
import ProductSkeleton from '../components/ProductSkeleton'
import useProducts from '../hooks/useProducts'
import { getProductId } from '../utils/product'

const emptyForm = {
  name: '',
  price: '',
  image: '',
  images: '',
  description: '',
  category: '',
  stock: '',
  rating: '4.5',
  featured: false,
}

const orderStatuses = ['Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled']

function getPayload(form) {
  return {
    name: form.name.trim(),
    price: Number(form.price),
    image: form.image.trim(),
    images: form.images.split(',').map((item) => item.trim()).filter(Boolean),
    description: form.description.trim(),
    category: form.category.trim(),
    stock: Number(form.stock),
    rating: Number(form.rating),
    featured: Boolean(form.featured),
  }
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function AdminDashboard() {
  const { products, pagination, loading, error, retry } = useProducts({ limit: 50, sort: 'newest' })
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState('')
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalOrders: 0, revenue: 0 })
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [userSearch, setUserSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' })
  const [creatingAdmin, setCreatingAdmin] = useState(false)

  const filteredProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase()
    if (!query) return products
    return products.filter((product) =>
      [product.name, product.category].some((value) => value?.toLowerCase().includes(query)),
    )
  }, [products, productSearch])

  useEffect(() => {
    if (!message) return undefined
    const timeout = setTimeout(() => setMessage(''), 2500)
    return () => clearTimeout(timeout)
  }, [message])

  useEffect(() => {
    loadAdminData()
  }, [])

  async function loadAdminData() {
    try {
      setAdminError('')
      const [statsData, usersData, ordersData] = await Promise.all([
        getAdminStats(),
        getUsers(),
        getAdminOrders(),
      ])
      setStats(statsData)
      setUsers(usersData)
      setOrders(ordersData)
    } catch {
      setAdminError('Admin data could not be loaded.')
    }
  }

  async function searchUsers(event) {
    event.preventDefault()
    try {
      setUsers(await getUsers({ search: userSearch }))
    } catch {
      setAdminError('Users could not be searched.')
    }
  }

  function handleAdminFormChange(event) {
    setAdminForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  function startEdit(product) {
    setEditingId(getProductId(product))
    setForm({
      name: product.name || '',
      price: product.price ?? '',
      image: product.image || '',
      images: Array.isArray(product.images) ? product.images.join(', ') : '',
      description: product.description || '',
      category: product.category || '',
      stock: product.stock ?? '',
      rating: product.rating ?? '4.5',
      featured: Boolean(product.featured),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() {
    setEditingId('')
    setForm(emptyForm)
    setFormError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setFormError('')

    try {
      if (editingId) {
        await updateProduct(editingId, getPayload(form))
        setMessage('Product updated.')
      } else {
        await createProduct(getPayload(form))
        setMessage('Product added.')
      }
      resetForm()
      retry()
      loadAdminData()
    } catch (apiError) {
      setFormError(apiError.response?.data?.message || 'Product could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteProduct(productId) {
    setFormError('')

    try {
      await deleteProduct(productId)
      setMessage('Product deleted.')
      if (editingId === productId) resetForm()
      retry()
      loadAdminData()
    } catch (apiError) {
      setFormError(apiError.response?.data?.message || 'Product could not be deleted.')
    }
  }

  async function handleDeleteUser(userId) {
    try {
      await deleteUser(userId)
      setUsers((current) => current.filter((user) => user.id !== userId))
      setMessage('User deleted.')
      loadAdminData()
    } catch (apiError) {
      setAdminError(apiError.response?.data?.message || 'User could not be deleted.')
    }
  }

  async function handleCreateAdmin(event) {
    event.preventDefault()
    setCreatingAdmin(true)
    setAdminError('')

    try {
      const data = await createAdminUser(adminForm)
      setUsers((current) => [data.user, ...current])
      setAdminForm({ name: '', email: '', password: '' })
      setMessage('Admin account created.')
      loadAdminData()
    } catch (apiError) {
      setAdminError(apiError.response?.data?.message || 'Admin account could not be created.')
    } finally {
      setCreatingAdmin(false)
    }
  }

  async function handleOrderStatus(orderId, status) {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status)
      setOrders((current) => current.map((order) => (order.id === orderId ? updatedOrder : order)))
      setMessage('Order status updated.')
      loadAdminData()
    } catch (apiError) {
      setAdminError(apiError.response?.data?.message || 'Order status could not be updated.')
    }
  }

  return (
    <main className="bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <section>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Admin dashboard</h1>
              <p className="mt-1 text-sm text-slate-500">Manage products, users, orders, and revenue from one workspace.</p>
            </div>
            {message && <p className="rounded-md bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">{message}</p>}
          </div>
          {adminError && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{adminError}</p>}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total products" value={stats.totalProducts || pagination.totalProducts} />
            <StatCard label="Total users" value={stats.totalUsers} />
            <StatCard label="Total orders" value={stats.totalOrders} />
            <StatCard label="Revenue" value={`$${Number(stats.revenue || 0).toFixed(2)}`} />
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit product' : 'Add product'}</h2>
          {formError && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{formError}</p>}

          <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Product name" required value={form.name} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" min="0" name="price" placeholder="Price" required type="number" value={form.price} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="category" placeholder="Category" required value={form.category} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" min="0" name="stock" placeholder="Stock" required type="number" value={form.stock} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" max="5" min="0" name="rating" placeholder="Rating" step="0.1" type="number" value={form.rating} onChange={handleChange} />
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input checked={form.featured} name="featured" type="checkbox" onChange={handleChange} />
              Featured product
            </label>
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="image" placeholder="Main image URL" required value={form.image} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="images" placeholder="Gallery URLs separated by commas" value={form.images} onChange={handleChange} />
            <textarea className="min-h-28 rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="description" placeholder="Description" required value={form.description} onChange={handleChange} />
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-2 md:justify-end">
              {editingId && (
                <button className="rounded-md border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700" type="button" onClick={resetForm}>
                  Cancel edit
                </button>
              )}
              <button className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-300" disabled={saving} type="submit">
                {saving ? 'Saving...' : editingId ? 'Update product' : 'Add product'}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Product management</h2>
            <input className="rounded-md border border-slate-200 px-4 py-2 text-sm sm:w-72" placeholder="Search products" value={productSearch} onChange={(event) => setProductSearch(event.target.value)} />
          </div>
          {loading && <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <ProductSkeleton key={index} />)}</div>}
          {error && <div className="mt-4"><ApiError message={error} onRetry={retry} /></div>}
          {!loading && !error && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredProducts.map((product) => {
                    const productId = getProductId(product)
                    return (
                      <tr key={productId}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img className="h-12 w-12 rounded-md border border-slate-200 object-cover" src={product.image} alt={product.name} loading="lazy" />
                            <span className="font-medium text-slate-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{product.category}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-600">{product.stock}</td>
                        <td className="px-4 py-3 text-slate-600">{product.rating || 0}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-blue-600" type="button" onClick={() => startEdit(product)}>Edit</button>
                            <button className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-red-600" type="button" onClick={() => handleDeleteProduct(productId)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-white p-5">
            <form className="mb-5 rounded-md border border-blue-100 bg-blue-50 p-4" onSubmit={handleCreateAdmin}>
              <h2 className="text-lg font-semibold text-slate-900">Create admin account</h2>
              <p className="mt-1 text-sm text-slate-600">Only logged-in admins can create another store admin.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Admin name" required value={adminForm.name} onChange={handleAdminFormChange} />
                <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Admin email" required type="email" value={adminForm.email} onChange={handleAdminFormChange} />
                <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" minLength="8" name="password" placeholder="Temporary password" required type="password" value={adminForm.password} onChange={handleAdminFormChange} />
                <button className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:bg-slate-300" disabled={creatingAdmin} type="submit">
                  {creatingAdmin ? 'Creating...' : 'Create admin'}
                </button>
              </div>
            </form>

            <form className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" onSubmit={searchUsers}>
              <h2 className="text-xl font-semibold text-slate-900">User management</h2>
              <div className="flex gap-2">
                <input className="min-w-0 rounded-md border border-slate-200 px-4 py-2 text-sm" placeholder="Search users" value={userSearch} onChange={(event) => setUserSearch(event.target.value)} />
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white" type="submit">Search</button>
              </div>
            </form>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-slate-500">{user.email}</p>
                      </td>
                      <td className="px-4 py-3 capitalize text-slate-600">{user.role}</td>
                      <td className="px-4 py-3">
                        <button className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-red-600 disabled:text-slate-300" disabled={user.role === 'admin'} type="button" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-slate-900">Order management</h2>
            <div className="mt-4 space-y-3">
              {orders.length === 0 && <p className="rounded-md bg-slate-50 p-5 text-center text-sm text-slate-500">No orders yet.</p>}
              {orders.map((order) => (
                <article className="rounded-md border border-slate-200 p-4" key={order.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">ORD-{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-slate-500">{order.user?.email || 'Customer'} - ${order.totalPrice.toFixed(2)}</p>
                    </div>
                    <select className="rounded-md border border-slate-200 px-3 py-2 text-sm" value={order.status} onChange={(event) => handleOrderStatus(order.id, event.target.value)}>
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">{order.products.length} products - {new Date(order.createdAt).toLocaleDateString()}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminDashboard
