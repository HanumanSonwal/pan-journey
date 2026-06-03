/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "offer-gradient":
          "linear-gradient(180deg, #72C0F0 0%, #4FA3C2 50%, #0F6A75 100%)",
      },

      /* ✅ ADD THIS */
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        jost: ["var(--font-jost)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
