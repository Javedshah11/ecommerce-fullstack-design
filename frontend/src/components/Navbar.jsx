// Navbar displays the main website navigation links and cart shortcut.
function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 px-4 py-4 shadow-sm shadow-slate-900/5 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-950"
          href="#home"
          aria-label="ShopEase home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-lg shadow-teal-500/25">
            S
          </span>
          <span>ShopEase</span>
        </a>

        <nav
          className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-600 md:justify-center"
          aria-label="Main navigation"
        >
          <a
            className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
            href="#home"
          >
            Home
          </a>
          <a
            className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
            href="#products"
          >
            Products
          </a>
          <a
            className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
            href="#categories"
          >
            Categories
          </a>
          <a
            className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700"
            href="#newsletter"
          >
            Newsletter
          </a>
        </nav>

        <a
          className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-teal-600 sm:w-auto"
          href="#cart"
          aria-label="View shopping cart"
        >
          <svg
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2ZM1 2v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21 5H5.21l-.94-2H1Zm16 16c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2Z" />
          </svg>
          <span>Cart</span>
          <strong className="flex h-6 min-w-6 items-center justify-center rounded-full bg-teal-400 px-1 text-xs text-slate-950">
            2
          </strong>
        </a>
      </div>
    </header>
  )
}

// Export Navbar so it can be imported into App.jsx.
export default Navbar
