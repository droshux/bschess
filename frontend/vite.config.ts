import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: 'localhost',
    proxy: {
      '/bss': 'http://localhost:7000', // The URL of the backend
      '/sys': 'http://localhost:7000', // The same!
    }
  },
})
