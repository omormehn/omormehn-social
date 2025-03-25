/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#5252C7",
        primary: '#888BF4',
        secondary: "#5151C6",
        logoBg: "#E3E4FC",
        primaryBg: "#F1F1FE",
      },
    },
  },
  plugins: [],
};
