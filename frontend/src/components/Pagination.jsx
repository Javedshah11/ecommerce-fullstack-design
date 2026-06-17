function Pagination() {
  return (
    <nav className="mt-5 flex flex-wrap items-center justify-end gap-2" aria-label="Pagination">
      <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500" type="button">
        Prev
      </button>
      {[1, 2, 3].map((page) => (
        <button
          className={`rounded-md border px-3 py-2 text-sm ${page === 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
          key={page}
          type="button"
        >
          {page}
        </button>
      ))}
      <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" type="button">
        Next
      </button>
    </nav>
  )
}

export default Pagination
