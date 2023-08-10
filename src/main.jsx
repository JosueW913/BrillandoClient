import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx'
import { ActProvider } from './context/act.context.jsx'
import { BookProvider } from './context/book.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ActProvider>
        <BookProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BookProvider>
      </ActProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
