/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#2D60FF",
        surface: "#EEF1F6",
      },
      boxShadow: {
        common: "10px 10px 80px 0px hsl(285 8 90 / 0.6)",
      },
    },
  },
  plugins: [],
};
