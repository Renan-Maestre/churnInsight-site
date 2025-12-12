import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@/components/theme-provider" // Importe aqui

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envolva o App com o ThemeProvider e force o dark mode como padrão se quiser */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)