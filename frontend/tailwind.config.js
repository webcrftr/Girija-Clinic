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
          50: '#F0F6FF',
          100: '#E0EDFF',
          200: '#C0DAFF',
          300: '#90BFFF',
          400: '#5099FF',
          500: '#2563EB', // Primary Color
          600: '#1D4ED8',
          750: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        secondary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          250: '#E2F0FD',
          500: '#3B82F6', // Secondary
          600: '#2563EB',
        },
        accent: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981', // Accent (Green)
          600: '#059669',
        },
        slate: {
          950: '#0F172A',
        }
      },
      borderRadius: {
        '2xl': '20px', // Custom Rounded Cards matching request
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
