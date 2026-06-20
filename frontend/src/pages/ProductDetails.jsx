import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ApiError from '../components/ApiError'
import DiscountBanner from '../components/DiscountBanner'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import SupplierCard from '../components/SupplierCard'
import useCart from '../hooks/useCart'
import useProduct from '../hooks/useProduct'
import useProducts from '../hooks/useProducts'
import { getProductId, getProductName } from '../utils/product'

function StockBadge({ stockStatus }) {
  const styles = {
    inStock: 'bg-green-50 text-green-700',
    lowStock: 'bg-amber-50 text-amber-700',
    outOfStock: 'bg-red-50 text-red-700',
  }
  const labels = {
    inStock: 'In stock',
    lowStock: 'Low stock',
    outOfStock: 'Out of stock',
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[stockStatus] || styles.outOfStock}`}>
      {labels[stockStatus] || 'Out of stock'}
    </span>
  )
}

function ReviewCard({ review }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-900">{review.name}</h3>
        <span className="text-sm font-semibold text-amber-500">{Number(review.rating || 0).toFixed(1)} / 5</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>
    </article>
  )
}

function ProductDetails() {
  const { id } = useParams()
  const { product, loading, error, retry } = useProduct(id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState('')
  const { products: relatedProducts } = useProducts({
    category: product?.category || '',
    limit: 5,
    sort: 'newest',
  })
  const productId = getProductId(product)
  const productName = getProductName(product)
  const related = relatedProducts.filter((item) => getProductId(item) !== productId).slice(0, 4)
  const maxQuantity = product?.stock || 0
  const quantityOptions = Array.from({ length: Math.min(maxQuantity, 10) }).map((_, index) => index + 1)
  const galleryImages = useMemo(() => {
    if (!product) return []

    const images = Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image]

    return [...new Set(images.filter(Boolean))]
  }, [product])
  const reviews = product?.reviews?.length
    ? product.reviews
    : [
        { name: 'Ayesha Khan', rating: 5, comment: 'Clean packaging, accurate stock details, and the product matched the photos.' },
        { name: 'Daniel Stone', rating: 4.5, comment: 'Good value and fast checkout experience. I would order from this catalog again.' },
      ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSelectedImage(galleryImages[0] || '')
    }, 0)

    return () => clearTimeout(timeout)
  }, [galleryImages])

  if (loading) {
    return (
      <main className="bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <ProductSkeleton />
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="bg-slate-100 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <ApiError message={error || 'Product not found.'} onRetry={retry} />
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-100 px-4 py-5">
      <div className="mx-auto max-w-7xl">
        <Link className="mb-4 inline-flex rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600" to="/products-grid">
          Back to products
        </Link>

        <section className="grid gap-5 rounded-md border border-slate-200 bg-white p-4 lg:grid-cols-[520px_1fr_280px]">
          <div>
            <div className="overflow-hidden rounded-md border border-slate-200 p-5">
              <img className="mx-auto aspect-square w-full object-contain transition duration-300 hover:scale-110" src={selectedImage || product.image} alt={productName} loading="lazy" />
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
              {galleryImages.map((image) => (
                <button
                  className={`rounded-md border bg-white p-1 transition ${image === (selectedImage || product.image) ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                >
                  <img className="aspect-square w-full object-cover" src={image} alt={`${productName} thumbnail`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <StockBadge stockStatus={product.stockStatus} />
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {product.category}
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-slate-900 md:text-3xl">{productName}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="font-semibold text-amber-500">*****</span>
              <span className="font-medium text-slate-600">{Number(product.rating || 0).toFixed(1)} rating</span>
              <span className="text-slate-400">{reviews.length} reviews</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>

            <div className="mt-5 rounded-md bg-blue-50 p-5">
              <p className="text-3xl font-semibold text-blue-700">${product.price.toFixed(2)}</p>
              <p className="mt-2 text-sm text-slate-600">{product.stock} units available</p>
            </div>


            <div className="mt-5 flex flex-wrap items-center gap-3">
              <select
                className="rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-slate-100"
                disabled={product.stock === 0}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              >
                {product.stock === 0 ? (
                  <option value={1}>Out of stock</option>
                ) : (
                  quantityOptions.map((quantity) => (
                    <option key={quantity} value={quantity}>Qty: {quantity}</option>
                  ))
                )}
              </select>
              <button
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                type="button"
                disabled={product.stock === 0}
                onClick={() => addToCart(product, quantity)}
              >
                Add to cart
              </button>
            </div>
          </div>

          <SupplierCard product={product} />
        </section>

        {related.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Related products</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={getProductId(item)} product={item} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Customer reviews</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard key={`${review.name}-${review.comment}`} review={review} />
            ))}
          </div>
        </section>
      </div>
      <DiscountBanner />
    </main>
  )
}

export default ProductDetails
