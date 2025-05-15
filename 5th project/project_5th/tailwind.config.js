/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#5a5959",
        yellow: "#ffeaae",
        "dark-yello": "#fcca3f",
        orange: "#f6820c",
        red: "#d01c28",
      },
    },
  },
  plugins: [],
};
