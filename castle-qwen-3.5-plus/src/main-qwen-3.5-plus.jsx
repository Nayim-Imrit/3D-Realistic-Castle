import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App-qwen-3.5-plus.jsx'
import './index-qwen-3.5-plus.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
