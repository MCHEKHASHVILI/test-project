import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {

  const isProduction = command === 'build'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      svgLoader(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@types': fileURLToPath(new URL('./src/types', import.meta.url))
      },
    },
    base: isProduction ? '/test-project/' : '/',
  }
})
