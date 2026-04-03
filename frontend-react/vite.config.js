import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ✨ ADD THIS RESOLVE BLOCK ✨
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})