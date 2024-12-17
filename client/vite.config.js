import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/users": "http://localhost:8000",
      "/api/v1/post": "http://localhost:8000",
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
  },
  plugins: [react()],
})
