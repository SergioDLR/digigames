module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['"Montserrat"', "Roboto"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
