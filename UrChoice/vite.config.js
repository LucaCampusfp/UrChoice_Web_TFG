import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    removeConsole(),
  ],
  esbuild: {
    drop: ['console', 'debugger']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: false,      // un solo CSS para evitar múltiples requests
    cssMinify: 'lightningcss', // minificación más agresiva
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // separa vendor del app code
        }
      }
    }

  }
})