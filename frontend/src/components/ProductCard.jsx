// ProductCard receives product details through props and displays them in a card.
function ProductCard({ image, title, price, description }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/12">
      <div className="overflow-hidden bg-slate-100">
        <img
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          src={image}
          alt={title}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-teal-600">
            Best seller
          </p>
          <h3 className="text-lg font-black text-slate-950">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xl font-black text-slate-950">
            ${price.toFixed(2)}
          </p>
          <button
            className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-black text-teal-700 transition hover:bg-teal-500 hover:text-white"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}

// Export ProductCard so product pages can import and use it.
export default ProductCard
