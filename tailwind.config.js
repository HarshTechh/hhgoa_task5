/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f3',
          100: '#ffe8e4',
          200: '#ffd5cc',
          300: '#ffb5a6',
          400: '#ff8a73',
          500: '#fa6348', // Primary coral from screenshot
          600: '#e8492c',
          700: '#c3351b',
          800: '#9f2d19',
          900: '#822a1a',
        },
        ios: {
          bg: '#f3f4f7',
          surface: '#ffffff',
          surfaceSubtle: '#f8f9fb',
          pill: '#eaebef',
          text: '#111215',
          textMuted: '#8e8e93',
          textSubtle: '#636366',
          border: 'rgba(0, 0, 0, 0.05)',
          borderSubtle: 'rgba(0, 0, 0, 0.03)'
        },
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          accent: '#06b6d4',
          electric: '#8b5cf6',
          coral: '#fa6348'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'ios-card': '0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'ios-card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'ios-dock': '0 10px 35px -5px rgba(0, 0, 0, 0.08), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'coral-glow': '0 8px 24px -4px rgba(250, 99, 72, 0.4)'
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '32px'
      }
    },
  },
  plugins: [],
}
