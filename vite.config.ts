/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Production builds are served under /bcard/ on the releases server.
  // Dev server runs at root so no base is needed there.
  base: process.env.NODE_ENV === 'production' ? '/bcard/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
