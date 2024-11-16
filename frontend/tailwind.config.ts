import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        livvic: ["Livvic", "sans-serif"],
      },
      colors: {
        primary: "#4A6CF7",
        light: "#F4F7F9",
        lightSecondary: "#FFFFFF",
        dark: "#031525",
        darkSecondary: "#10263B",
        danger: "#FF4D4F",
        success: "#52C41A",
        warning: "#FAAD14",
        info: "#1890FF",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },

  plugins: [],
  safelist: [
    "rounded-none",
    "rounded-sm",
    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-3xl",
    "rounded-full",
    "backdrop-blur-sm",
    "backdrop-blur-md",
    "backdrop-blur-lg",
    "backdrop-blur-xl",
    "backdrop-blur-2xl",
    "backdrop-blur-3xl",
  ],
};
export default config;
