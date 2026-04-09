/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // VITE_BASE overrides the base path (default '/' for production deploys like Cloudways).
  // The local releases server sets VITE_BASE=/bcard/ via the release script.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('jspdf') || id.includes('jspdf-autotable')) return 'pdf-export';
          if (id.includes('svg2pdf')) return 'svg2pdf';
          if (id.includes('html2canvas')) return 'html2canvas';
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
