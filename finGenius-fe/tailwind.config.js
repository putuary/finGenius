/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        'sm': '375px',
      },
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  plugins: [],
};
