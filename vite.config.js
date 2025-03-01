import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensure base path is set correctly
  server: {
    historyApiFallback: true,  // Ensure correct routing
  },
})
