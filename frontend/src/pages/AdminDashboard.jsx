import { useEffect, useState } from 'react'
import { createProduct, deleteProduct, updateProduct } from '../api/products'
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
  featured: false,
}

function getPayload(form) {
  return {
    name: form.name.trim(),
    price: Number(form.price),
    image: form.image.trim(),
    images: form.images.split(',').map((item) => item.trim()).filter(Boolean),
    description: form.description.trim(),
    category: form.category.trim(),
    stock: Number(form.stock),
    featured: Boolean(form.featured),
  }
}

function AdminDashboard() {
  const { products, pagination, loading, error, retry } = useProducts({ limit: 50, sort: 'newest' })
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState('')
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!message) return undefined
    const timeout = setTimeout(() => setMessage(''), 2500)
    return () => clearTimeout(timeout)
  }, [message])

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
    } catch (apiError) {
      setFormError(apiError.response?.data?.message || 'Product could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(productId) {
    setFormError('')

    try {
      await deleteProduct(productId)
      setMessage('Product deleted.')
      if (editingId === productId) resetForm()
      retry()
    } catch (apiError) {
      setFormError(apiError.response?.data?.message || 'Product could not be deleted.')
    }
  }

  return (
    <main className="bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <section className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Admin dashboard</h1>
              <p className="mt-1 text-sm text-slate-500">{pagination.totalProducts} products managed from MongoDB.</p>
            </div>
            {message && <p className="rounded-md bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">{message}</p>}
          </div>

          {formError && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{formError}</p>}

          <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Product name" required value={form.name} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" min="0" name="price" placeholder="Price" required type="number" value={form.price} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" name="category" placeholder="Category" required value={form.category} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm" min="0" name="stock" placeholder="Stock" required type="number" value={form.stock} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="image" placeholder="Main image URL" required value={form.image} onChange={handleChange} />
            <input className="rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="images" placeholder="Gallery URLs separated by commas" value={form.images} onChange={handleChange} />
            <textarea className="min-h-28 rounded-md border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="description" placeholder="Description" required value={form.description} onChange={handleChange} />
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input checked={form.featured} name="featured" type="checkbox" onChange={handleChange} />
              Featured product
            </label>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
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
          <h2 className="text-xl font-semibold text-slate-900">All products</h2>
          {loading && <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <ProductSkeleton key={index} />)}</div>}
          {error && <div className="mt-4"><ApiError message={error} onRetry={retry} /></div>}
          {!loading && !error && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map((product) => {
                    const productId = getProductId(product)
                    return (
                      <tr key={productId}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img className="h-12 w-12 rounded-md border border-slate-200 object-cover" src={product.image} alt={product.name} />
                            <span className="font-medium text-slate-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{product.category}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-600">{product.stock}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-blue-600" type="button" onClick={() => startEdit(product)}>Edit</button>
                            <button className="rounded-md border border-slate-200 px-3 py-2 font-semibold text-red-600" type="button" onClick={() => handleDelete(productId)}>Delete</button>
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
      </div>
    </main>
  )
}

export default AdminDashboard
