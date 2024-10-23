// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Using __dirname requires importing 'path' and 'url' in ESM
      '@': path.resolve(path.dirname(new URL(import.meta.url).pathname), './src'),
    },
  },
})