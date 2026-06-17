import { useState } from 'react'

function Newsletter() {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Thanks for subscribing. We will send marketplace updates soon.')
    event.currentTarget.reset()
  }

  return (
    <section className="bg-slate-200/70 px-4 py-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-xl font-semibold text-slate-900">Subscribe on our newsletter</h2>
        <p className="mt-2 text-sm text-slate-600">
          Get daily news on upcoming offers from many suppliers all over the world.
        </p>
        <form className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
          <input className="min-h-10 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-500" placeholder="Email" required type="email" />
          <button className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700" type="submit">
            Subscribe
          </button>
        </form>
        {message && <p className="mt-3 text-sm font-medium text-green-700">{message}</p>}
      </div>
    </section>
  )
}

export default Newsletter
