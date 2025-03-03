import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './Context/ThemeProvider.tsx'
import { LanguageProvider } from './Context/LanguageProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
)
