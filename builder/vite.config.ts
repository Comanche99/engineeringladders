import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../assets/builder',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/assets/builder/' : '/',
  server: {
    port: 3000,
    open: false
  }
})
