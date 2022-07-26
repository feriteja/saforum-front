/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "mochi-pop": ['"Mochiy Pop One"', "cursive"],
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        button: "var(--color-bg-button)",
        accent: "var(--color-accent)",
      },
      textColor: {
        accent: "var(--color-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        btnText: "var(--color-bg-secondary)",
      },
      borderColor: {
        primary: "var(--color-border-primary)",
        secondary: "var(--color-bg-secondary)",
        input: "var(--color-bg-input)",
        accent: "var(--color-accent)",
      },
      animation: {
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
