import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  return {
    plugins: [react()],
    // base nur für Production (GitHub Pages), lokal bleibt '/'
    base: isDev ? '/' : '/uhrzeit-app/',
    // SPA-Modus: alle Routen zur index.html weiterleiten
    appType: 'spa',
  }
})
