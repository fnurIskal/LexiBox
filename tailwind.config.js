/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: "#FDFAF5",
        myOrange: "#FF6600",
        myNavi: "#2619e3",
        myBlue: "#9CD8FB",
        myRed: "#F986A5",
        myPurple: "#DDAEF1",
        myGreen: "#95F45E",
        myYellow: "#FDF07D",
        borderColor: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
