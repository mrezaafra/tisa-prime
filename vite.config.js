import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/variables.scss" as *;`
            }
        }
    },
    build: {
        minify: 'esbuild',
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Core Vue ecosystem - group together for better caching
                        if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia') || id.includes('vue-i18n')) {
                            return 'vendor'
                        }
                        // PrimeVue ecosystem
                        if (id.includes('primevue') || id.includes('primeicons')) {
                            return 'primevue'
                        }
                        // Automatic chunking for other node_modules packages
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                }
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        https: false,
        open: false,
        hmr: true,
        proxy: {
            '/api': 'http://localhost:8000/'
        }
    },
})
