import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import ProtectedRoute from './components/ProtectedRoute'
import SidebarDrawer from './components/SidebarDrawer'
import Footer from './components/Footer'
import AdminDashboard from './pages/AdminDashboard'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProductDetails from './pages/ProductDetails'
import ProductGrid from './pages/ProductGrid'
import Products from './pages/Products'
import Signup from './pages/Signup'
import AuthProvider from './components/AuthProvider'
import CartProvider from './components/CartProvider'
import useAuth from './hooks/useAuth'
import useCart from './hooks/useCart'

function ToastLayer() {
  const { toast } = useCart()
  const { toast: authToast } = useAuth()
  const message = toast || authToast

  if (!message) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-md bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  )
}

// App is the main component that connects the page layout together.
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // JSX lets us write HTML-like markup inside JavaScript.
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 antialiased">
          <Header />
          <MobileHeader onMenuClick={() => setIsDrawerOpen(true)} />
          <SidebarDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products-grid" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          </Routes>

          <Footer />
          <ToastLayer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

// Export App so main.jsx can import and render it in the browser.
export default App
