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
        primary: "#888BF4",
        secondary: "#5151C6",
        logoBg: "#E3E4FC",
        primaryBg: "#F1F1FE",
        searchBg: "#F3F5F7",
        shade: "#8F90A7",
        grayBg: "#F6F7F9",
        placeHolder: "#BDBDBD",
        textShade: '#C0C0C0',
        bgShade: 'rgba(255, 255, 255, 0.2)',
        bgShade2: 'rgba(255, 255, 255, 0.12)',
      },
    },
  },
  plugins: [],
};
