import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import SidebarDrawer from './components/SidebarDrawer'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProductDetails from './pages/ProductDetails'
import ProductGrid from './pages/ProductGrid'
import Products from './pages/Products'
import CartProvider from './components/CartProvider'
import useCart from './hooks/useCart'

function ToastLayer() {
  const { toast } = useCart()

  if (!toast) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-md bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-lg">
      {toast}
    </div>
  )
}

// App is the main component that connects the page layout together.
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // JSX lets us write HTML-like markup inside JavaScript.
  return (
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
        <ToastLayer />
      </div>
    </CartProvider>
  )
}

// Export App so main.jsx can import and render it in the browser.
export default App
