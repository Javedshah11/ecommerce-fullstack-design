import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import SidebarDrawer from './components/SidebarDrawer'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import ProductGrid from './pages/ProductGrid'
import Products from './pages/Products'

// App is the main component that connects the page layout together.
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // JSX lets us write HTML-like markup inside JavaScript.
  return (
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
      </Routes>

      <Footer />
    </div>
  )
}

// Export App so main.jsx can import and render it in the browser.
export default App
