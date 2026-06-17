// Navbar displays the main website navigation links and cart shortcut.
function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar__logo" href="#home" aria-label="ShopEase home">
        <span className="navbar__logo-mark">S</span>
        <span>ShopEase</span>
      </a>

      <nav className="navbar__links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#categories">Categories</a>
        <a href="#newsletter">Newsletter</a>
      </nav>

      <a className="navbar__cart" href="#cart" aria-label="View shopping cart">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2ZM1 2v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21 5H5.21l-.94-2H1Zm16 16c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2Z" />
        </svg>
        <span>Cart</span>
        <strong>2</strong>
      </a>
    </header>
  )
}

// Export Navbar so it can be imported into App.jsx.
export default Navbar
