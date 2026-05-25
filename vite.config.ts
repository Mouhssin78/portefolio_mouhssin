import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/portefolio_mouhssin/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'images'),
    },
  },
})
