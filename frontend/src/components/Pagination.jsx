import { useState } from 'react'

function Pagination() {
  const [activePage, setActivePage] = useState(1)

  return (
    <nav className="mt-5 flex flex-wrap items-center justify-end gap-2" aria-label="Pagination">
      <button
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        disabled={activePage === 1}
        onClick={() => setActivePage((page) => Math.max(1, page - 1))}
      >
        Prev
      </button>
      {[1, 2, 3].map((page) => (
        <button
          className={`rounded-md border px-3 py-2 text-sm ${page === activePage ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
          key={page}
          type="button"
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        disabled={activePage === 3}
        onClick={() => setActivePage((page) => Math.min(3, page + 1))}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
