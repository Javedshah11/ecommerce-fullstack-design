// Navbar displays the main website navigation links.
function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar__logo" href="#home" aria-label="ShopEase home">
        ShopEase
      </a>

      <nav className="navbar__links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#cart">Cart</a>
      </nav>
    </header>
  )
}

// Export Navbar so it can be imported into App.jsx.
export default Navbar
