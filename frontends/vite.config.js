import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    proxy : {
      "/api/" : "https://mern-app-1-e7mz.onrender.com",
      "/uploads/" : "https://mern-app-1-e7mz.onrender.com",
    }
  }
})
