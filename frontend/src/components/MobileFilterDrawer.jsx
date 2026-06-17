import FilterSidebar from './FilterSidebar'

function MobileFilterDrawer({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
      <button
        className={`absolute inset-0 bg-slate-900/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        type="button"
        aria-label="Close filters"
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-80 max-w-[88vw] overflow-y-auto bg-slate-100 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600"
            type="button"
            aria-label="Close filters"
            onClick={onClose}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <FilterSidebar isMobile />
          <button
            className="mt-4 w-full rounded-md bg-blue-600 py-3 text-sm font-semibold text-white"
            type="button"
            onClick={onClose}
          >
            Show results
          </button>
        </div>
      </aside>
    </div>
  )
}

export default MobileFilterDrawer
