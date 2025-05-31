/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {
        colors: {
          primary: "#160C28",
          accent: "#FBBF24", // similar to yellow-400
          dark: "#0B081D",
          soft: "#AEB7B3",
          highlight: "#E1EFE6",
          mboa: {
            dark: "#0B081D",
            darker: "#000411",
            gray1: "#62626E",
            gray2: "#646C6F",
            light: "#F2F8F4",
            mint: "#E1EFE6",
            fog: "#C8D3CD",
            cloud: "#AEB7B3",
          },
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"], // Or 'Satoshi', etc.
        },
      },
    },
  },
  plugins: daisyui,
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
