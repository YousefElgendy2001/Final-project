const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // يجعل Tailwind يدعم الدارك مود عبر `class`
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        "main":"#0aad0a"
        
      },
      container:{
        center:true
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
