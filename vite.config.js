import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { fileURLToPath, URL } from 'node:url'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
import { createRequire } from 'node:module'

const require = createRequire( import.meta.url )

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [
    vue(),
    basicSsl(),
    ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})