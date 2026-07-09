import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import './index.css'
import App from './App.jsx'

import { CarritoProvider } from './context/CarritoContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <HelmetProvider>    
    <AuthProvider>
      <CarritoProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CarritoProvider>
      </AuthProvider>
    </HelmetProvider>
  </BrowserRouter>,
)
