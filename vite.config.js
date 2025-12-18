import { defineConfig } from 'vite'

export default defineConfig({
    base: '/findeano2025.github.io/',
    build: {
        rollupOptions: {
            input: {
                main: 'public/index.html',
                planning: 'public/planning.html',
                tabla: 'public/tabla.html',
                evento: 'public/evento.html',
                equipo: 'public/equipo.html'
            }
        }
    },
    publicDir: 'public'
})
