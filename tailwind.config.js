/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#4F46E5',
        accent: '#00D4AA',
        'bg-main': '#F0F4FF',
        'card-bg': 'rgba(255, 255, 255, 0.7)',
        'text-main': '#1E1B4B',
        'subtext': '#6B7280',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        glass: '12px',
      },
      borderRadius: {
        '2xl': '1rem',
        'xl': '0.75rem',
      },
      letterSpacing: {
        tight: '-0.025em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
    },
  },
  plugins: [],
}
