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
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
};
