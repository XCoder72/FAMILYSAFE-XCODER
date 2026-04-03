/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- THIS TELLS TAILWIND TO ONLY LISTEN TO OUR BUTTON
  theme: {
    extend: {},
  },
  plugins: [],
}