function Pagination({ page = 1, totalPages = 1, onPageChange }) {
  return (
    <nav className="mt-5 flex flex-wrap items-center justify-end gap-2" aria-label="Pagination">
      <button
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1

        return (
        <button
          className={`rounded-md border px-3 py-2 text-sm ${pageNumber === page ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
        )
      })}
      <button
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
