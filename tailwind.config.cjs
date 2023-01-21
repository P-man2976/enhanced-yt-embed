const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'Noto Sans JP',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-safe-area'),
  ],
};
