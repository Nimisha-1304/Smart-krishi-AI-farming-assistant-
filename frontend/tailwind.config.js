/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        farm: {
          50: '#ecfdf3',
          100: '#d1fae5',
          500: '#22c55e',
          700: '#15803d',
          900: '#14532d'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(21, 128, 61, 0.12)'
      },
      animation: {
        float: 'float 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    }
  },
  plugins: []
};
