/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        special: ['Poppins']
      },
      gradientColorStops: (theme) => ({
        'purple-dark': '#301847',
        'red-deep': '#C10214',
      }),
      borderImage: {
        'gradient': 'linear-gradient(to right, #301847, #C10214)',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

