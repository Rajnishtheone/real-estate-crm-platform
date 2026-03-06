/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F52BA',
        secondary: '#0C3C78',
        accent: '#F59E0B'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
