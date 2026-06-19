import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation()
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <main className="min-h-[50vh] bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-md border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
          Checking your session...
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/profile" replace />
  }

  return children
}

export default ProtectedRoute
