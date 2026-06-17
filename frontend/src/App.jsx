// Import shared layout components used across the application.
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import the first page shown in this beginner Week 1 project.
import Home from './pages/Home'

// Import component styles for the eCommerce frontend.
import './App.css'

// App is the main component that connects the page layout together.
function App() {
  // JSX lets us write HTML-like markup inside JavaScript.
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

// Export App so main.jsx can import and render it in the browser.
export default App
