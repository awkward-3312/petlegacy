/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class', // Puedes usar 'media' si prefieres seguir la preferencia del sistema
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        pastel: {
          pink: '#FFC8DD',
          peach: '#FFAFCC',
          blue: '#BDE0FE',
          aqua: '#A2D2FF',
          lilac: '#CDB4DB',
        },
        brand: {
          light: '#fef6ff',
          dark: '#1A1A2E',
        },
      },
      backgroundImage: {
        hero: "linear-gradient(to right, #CDB4DB, #FFC8DD, #FFAFCC, #BDE0FE, #A2D2FF)",
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
