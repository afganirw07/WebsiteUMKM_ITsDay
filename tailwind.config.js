/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,css,js}"],
  theme: {
    extend: {
      fontFamily: {
         tilt: ['"Tilt Warp"', 'cursive'],
        lexend: ['"Lexend"', 'sans-serif'],
        urbanist: ['"Urbanist"', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 