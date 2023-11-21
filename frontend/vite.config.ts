import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    proxy: {
      '/bss': 'http://localhost:7000', // The URL of the backend
      '/sys': 'http://localhost:7000', // The same!
    }
  }
})
