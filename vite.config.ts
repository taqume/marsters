import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@models': resolve(__dirname, './src/models'),
      '@services': resolve(__dirname, './src/services'),
      '@stores': resolve(__dirname, './src/stores'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@data': resolve(__dirname, './src/data'),
      '@i18n': resolve(__dirname, './src/i18n'),
    },
  },
})
