import { defineConfig } from 'vite'
import { resolve } from 'path'
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
  plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        productDetails: resolve(__dirname, 'src/pages/productDetails.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        cart: resolve(__dirname, 'src/pages/cart.html'),
        catalog: resolve(__dirname, 'src/pages/catalog.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
      },
    },
  },
})
