module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF2F5',
          100: '#FFE4EB',
          200: '#FFC8D5',
          300: '#FFA0B8',
          400: '#F07898',
          500: '#D4849A',
          600: '#B5617A',
          700: '#8B4A60',
          800: '#6B3248',
          900: '#4A1F30',
        },
        boutique: {
          dark: '#7D3A52',
          deep: '#B5617A',
          medium: '#C88090',
          rose: '#E0A8B8',
          gold: '#C5A55A',
          'gold-light': '#E8D5A0',
          cream: '#FFF8FA',
          blush: '#FDE8EE',
          ivory: '#FFF2F5',
          pink: '#F5D0D8',
        },
        silver: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
