/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgwhite: "#F6F6F6",
        bgblack: "#232428",
        "white-c": "#FFFFFF",
        "black-c": "#232428",
        "gray-c": "#E1E1E1",
        success: "#22C55E",
        warning: "#FBBF24",
        info: "#3B82F6",
        error: "#F43F5E",
      },
      borderRadius: {
        rounded: "0.5rem",
        "rounded-md": "0.75rem",
        "rounded-xl": "1rem",
      },
      fontFamily: {
        saira: ["Saira", "sans-serif"],
      },
      boxShadow: {
        default: "0px 4px 22px rgba(0, 0, 0, 0.05)",
        tab: "0px 4px 4px -4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
