import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { GameStateProvider } from './context/GameStateContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </BrowserRouter>
  </StrictMode>,
)
