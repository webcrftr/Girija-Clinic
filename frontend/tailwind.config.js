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
        ayurveda: {
          dark: '#14291D',       // Rich Forest Dark Green
          deep: '#1B3B2B',       // Primary Deep Ayurvedic Green
          emerald: '#27523C',    // Mid Emerald Green
          light: '#3C6E52',      // Accent Soft Green
          mint: '#EBF4EF',       // Background Mint Tint
          gold: '#C59B27',       // Warm Ayurvedic Gold Accent
          goldHover: '#B2881E',  // Gold Hover state
          goldLight: '#FDF7E7',  // Soft Gold Tint
          cream: '#FDFBF7',      // Primary Soft Cream Background
          beige: '#F6F2EA',      // Secondary Soft Warm Beige
          earth: '#4A3B32',      // Muted Earthy Brown Text/Accent
          sand: '#EAE4D9',       // Border Soft Sand
        },
        primary: {
          50: '#EBF4EF',
          100: '#D7E9DF',
          200: '#B0D3C0',
          300: '#88BDA0',
          400: '#5BA37E',
          500: '#1B3B2B', // Deep Forest Green
          600: '#14291D',
          700: '#0E1F16',
          800: '#09150E',
          900: '#040B07',
        },
        medical: {
          white: '#FFFFFF',
          secondary: '#FDFBF7',
          alt: '#F6F2EA',
          textMain: '#14291D',
          textMuted: '#5C6B61',
          accent: '#C59B27',
          border: '#E2DDD4',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          105: '#EDF2F7',
          150: '#E6EDF5',
          155: '#E2EAF2',
          200: '#E2E8F0',
          205: '#D8E2EC',
          300: '#CBD5E1',
          400: '#94A3B8',
          450: '#7E8F9F',
          455: '#768899',
          500: '#64748B',
          600: '#475569',
          650: '#3D4D61',
          700: '#334155',
          750: '#283647',
          800: '#1E293B',
          804: '#1A2434',
          805: '#182333',
          850: '#131D2B',
          855: '#111A27',
          900: '#0F172A',
          905: '#0A111C',
          950: '#070C14',
        }
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      boxShadow: {
        'soft': '0 4px 25px 0 rgba(27, 59, 43, 0.05)',
        'soft-hover': '0 12px 36px 0 rgba(27, 59, 43, 0.12)',
        'gold-glow': '0 4px 20px 0 rgba(197, 155, 39, 0.25)',
        'card': '0 2px 16px 0 rgba(20, 41, 29, 0.04)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'serif', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
