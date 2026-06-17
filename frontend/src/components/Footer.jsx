// Footer displays helpful links and social shortcuts at the bottom of the page.
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
        <div>
          <a className="text-2xl font-black tracking-tight text-slate-950" href="#home">
            ShopEase
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Curated essentials, simple shopping, and modern style for everyday
            living.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-slate-600 md:justify-center"
          aria-label="Footer links"
        >
          <a className="transition hover:text-teal-700" href="#products">Products</a>
          <a className="transition hover:text-teal-700" href="#categories">Categories</a>
          <a className="transition hover:text-teal-700" href="#newsletter">Newsletter</a>
          <a className="transition hover:text-teal-700" href="#cart">Cart</a>
        </div>

        <div className="flex gap-3 md:justify-end" aria-label="Social links">
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black uppercase text-white transition hover:bg-teal-600"
            href="#home"
            aria-label="Facebook"
          >
            f
          </a>
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-xs font-black uppercase text-white transition hover:bg-teal-600"
            href="#home"
            aria-label="Instagram"
          >
            ig
          </a>
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black uppercase text-white transition hover:bg-teal-600"
            href="#home"
            aria-label="Twitter"
          >
            x
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-7xl border-t border-slate-200 pt-6 text-sm text-slate-500">
        &copy; {currentYear} ShopEase. All rights reserved.
      </p>
    </footer>
  )
}

// Export Footer so it can be reused in the app layout.
export default Footer
