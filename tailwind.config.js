/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#d4af37",
                "primary-hover": "#b5952f",
                "primary-light": "#F3E5AB", // From Event tab
                "primary-dim": "rgba(212, 175, 55, 0.1)",
                "background-light": "#f6f8f6",
                "background-dark": "#0f1216",
                "surface-dark": "#121212",
                "glass-border": "rgba(255, 255, 255, 0.1)",
                "glass-bg": "rgba(21, 32, 18, 0.6)",
                "text-gold": "#F9E29C",
            },
            fontFamily: {
                "display": ["Playfair Display", "serif"],
                "body": ["Inter", "sans-serif"],
                "sans": ["Inter", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2938&auto=format&fit=crop')",
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F9E29C 50%, #D4AF37 100%)',
                'dark-gradient': 'radial-gradient(circle at 50% 0%, #1f1f1f 0%, #050505 100%)',
            },
            animation: {
                'shine': 'shine 4s linear infinite',
            },
            keyframes: {
                shine: {
                    '0%': { backgroundPosition: '200% center' },
                    '100%': { backgroundPosition: '-200% center' },
                }
            }
        },
    },
    plugins: [],
}
