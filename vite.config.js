import { defineConfig } from 'vite'

export default defineConfig({
    base: '/findeano2025.github.io/',
    root: 'public',
    build: {
        outDir: '../dist/public',
        emptyOutDir: true
    }
})
