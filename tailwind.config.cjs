/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:  {
      
      animation: {
        "tracking-in-expand": "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        "scale-up-hor-center": "scale-up-hor-center 0.8s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both"
    },
    keyframes: {
      "tracking-in-expand": {
          "0%": {
              "letter-spacing": "-.5em",
              opacity: "0"
          },
          "40%": {
              opacity: ".6"
          },
          to: {
              opacity: "1"
          }
      },
      "scale-up-hor-center": {
        "0%": {
            transform: "scaleX(.4)"
        },
        to: {
            transform: "scaleX(1)"
        }
    }
  }
  }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
