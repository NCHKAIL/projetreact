
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { PanierProvider } from './Composants/paniercontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PanierProvider>
    
        <App />
      </PanierProvider>
    </BrowserRouter>
  </StrictMode>,
)
