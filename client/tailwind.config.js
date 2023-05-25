/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {},
    colors: {
      /* Auxo UX/UI Custom Colour Tokens */

      transparent: 'transparent',
      black: 'black',
      white: 'white',
      'background': '#F9F4EF',
      'headline': '#001858',
      'paragraph': '#172C66',
      'button': '#716040',
      'button-text': '#FFFFFE',
      'test': '#252F3D'

    },
    screens: {
      "small": "640px", // @media (min-width: 640px)
      
      "medium": "768px", // @media (min-width: 768px)

      "large": "1024px", // @media (min-width: 1024px)

      "xlarge": "1280px", // @media (min-width: 1280px)

      "2xlarge": '1536px', // @media (min-width: 1536px)
    }
  },
  plugins: [],
}
