import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App-qwen-3.8-flash.jsx'
import './index-qwen-3.8-flash.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
