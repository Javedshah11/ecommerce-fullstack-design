function Newsletter() {
  return (
    <section className="bg-slate-200/70 px-4 py-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-xl font-semibold text-slate-900">Subscribe on our newsletter</h2>
        <p className="mt-2 text-sm text-slate-600">
          Get daily news on upcoming offers from many suppliers all over the world.
        </p>
        <form className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row">
          <input className="min-h-10 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-500" placeholder="Email" type="email" />
          <button className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700" type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
