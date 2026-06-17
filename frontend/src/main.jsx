import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot connects React to the div with id="root" in index.html.
createRoot(document.getElementById('root')).render(
  // StrictMode helps highlight possible issues while learning React.
  <StrictMode>
    <App />
  </StrictMode>,
)
