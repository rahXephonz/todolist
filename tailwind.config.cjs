module.exports = {
  content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        blue: "#16abf8",
      },

      maxWidth: {
        full: "1000px",
      },

      boxShadow: {
        normal: "0 4px 8px 3px rgb(0 0 0 / 15%)",
      },
    },
  },
};
