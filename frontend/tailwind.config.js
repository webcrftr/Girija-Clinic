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
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB', // Primary Accent Blue #2563EB
          600: '#1D4ED8', // Hover #1D4ED8
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#1E3A8A',
        },
        medical: {
          white: '#FFFFFF',
          secondary: '#F8FAFC',
          alt: '#F5F8FD',
          textMain: '#0F172A',
          textMuted: '#64748B',
          accent: '#2563EB',
          lightBlue: '#DBEAFE',
          border: '#E2E8F0',
        },
        slate: {
          950: '#0F172A',
        }
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px 0 rgba(15, 23, 42, 0.03)',
        'soft-hover': '0 12px 32px 0 rgba(37, 99, 235, 0.08)',
        'card': '0 2px 12px 0 rgba(15, 23, 42, 0.03)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
