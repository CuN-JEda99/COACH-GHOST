/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghost: {
          black: '#000000',
          dark: '#09090b',
          card: '#121214',
          border: '#222226',
          zinc: '#18181B',
          neon: '#00FF88',
          neonHover: '#00cc6a',
          muted: '#A1A1AA',
          light: '#F4F4F5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'neon': '0 0 25px -5px rgba(0, 255, 136, 0.35)',
        'neon-lg': '0 0 35px 2px rgba(0, 255, 136, 0.45)',
        'neon-subtle': '0 0 15px rgba(0, 255, 136, 0.15)'
      }
    },
  },
  plugins: [],
}
