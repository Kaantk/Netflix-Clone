/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        link: "#e5e5e5",
        background: "#141414",
        button: "#808080",
      },
    },
  },
  plugins: [],
};
