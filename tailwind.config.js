module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['"Montserrat"', "Roboto"],
      },
      animation: {
        load: "load 1s",
      },
      keyframes: {
        load: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
