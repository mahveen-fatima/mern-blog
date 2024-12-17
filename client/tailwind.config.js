/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#09090B",
        textColor: "#E4E4E7",
        btnColor : "#312e81"
      }
    },
  },
  plugins: [],
}

