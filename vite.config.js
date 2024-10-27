import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/Prueba1/',  // Asegúrate de usar el nombre exacto del repositorio
  plugins: [react()]
})
