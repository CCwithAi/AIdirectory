import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses, including localhost and network IP
    port: 5173, // Try a specific port
    strictPort: true, // Fail if port is already in use
  },
}) 