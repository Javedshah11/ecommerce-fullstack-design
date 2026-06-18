function ApiError({ message, onRetry }) {
  return (
    <div className="rounded-md border border-red-100 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      <button
        className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        type="button"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  )
}

export default ApiError
