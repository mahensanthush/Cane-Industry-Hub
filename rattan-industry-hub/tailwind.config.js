/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rattan-cream': '#FAF9F6', // The off-white navbar color
        'rattan-green': '#244034', // The specific forest green from the buttons
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Sets the exact font
      }
    },
  },
  plugins: [],
}