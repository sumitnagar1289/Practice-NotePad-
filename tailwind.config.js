/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./build/**/*.html"],
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        background: "#202124",
      }),
      textColor: (theme) => theme("colors"),
      textColor: {
        offwhite: "#e1e1e2",
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}
