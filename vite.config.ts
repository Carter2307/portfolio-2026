import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { themeInitScript } from 'ferry-ui'
import { defineConfig, type Plugin } from 'vite'

/** Apply the stored theme before the first paint, using the ferry-ui bootstrap. */
const themeInit: Plugin = {
  name: 'portfolio:theme-init',
  transformIndexHtml: () => [
    { tag: 'script', children: themeInitScript('portfolio-theme'), injectTo: 'head' },
  ],
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), themeInit],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
