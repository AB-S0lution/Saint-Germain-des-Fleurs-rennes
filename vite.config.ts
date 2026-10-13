import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Site multi-pages (un HTML par page, un module par page dans src/pages).
// GitHub Pages : https://ab-s0lution.github.io/Saint-Germain-des-Fleurs-rennes/
const pages = ['index', 'histoire', 'ferme', 'route', 'saisons', 'bouquets', 'composer', 'seches', 'occasions', 'marches', 'journal', 'galerie', 'faq', 'contact', 'mentions', 'confidentialite']

export default defineConfig({
  base: '/Saint-Germain-des-Fleurs-rennes/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, `${p}.html`])),
    },
  },
})
