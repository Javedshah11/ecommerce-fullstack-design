// Footer displays helpful links and social shortcuts at the bottom of the page.
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <a className="footer__logo" href="#home">
            ShopEase
          </a>
          <p>
            Curated essentials, simple shopping, and modern style for everyday
            living.
          </p>
        </div>

        <div className="footer__links" aria-label="Footer links">
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#newsletter">Newsletter</a>
          <a href="#cart">Cart</a>
        </div>

        <div className="footer__social" aria-label="Social links">
          <a href="#home" aria-label="Facebook">
            f
          </a>
          <a href="#home" aria-label="Instagram">
            ig
          </a>
          <a href="#home" aria-label="Twitter">
            x
          </a>
        </div>
      </div>

      <p className="footer__copyright">
        &copy; {currentYear} ShopEase. All rights reserved.
      </p>
    </footer>
  )
}

// Export Footer so it can be reused in the app layout.
export default Footer
