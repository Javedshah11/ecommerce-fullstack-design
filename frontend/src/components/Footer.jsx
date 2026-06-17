// Footer displays simple copyright information at the bottom of the page.
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>&copy; {currentYear} ShopEase. All rights reserved.</p>
    </footer>
  )
}

// Export Footer so it can be reused in the app layout.
export default Footer
