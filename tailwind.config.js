/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary gold shades (meets AA and AAA contrast requirements)
        gold: {
          50: '#FFF9E5',
          100: '#FFF0BF',
          200: '#FFE699',
          300: '#FFDB73',
          400: '#FFD14D',
          500: '#FFC726', // Primary gold (meets AA contrast with dark backgrounds)
          600: '#E6B322',
          700: '#CC9F1D',
          800: '#B38B19',
          900: '#997714',
        },
        // Dark shades
        dark: {
          50: '#F2F2F2',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#1A1A1A', // Primary background
          900: '#0D0D0D', // Darker background
        }
      },
    },
  },
  plugins: [],
};