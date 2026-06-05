import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sui-blue": "#4DA2FF",
        sky: "#6FBCF0",
        aqua: "#C0E6FF",
        navy: "#030F1C",
        deep: "#011829",
        slate: "#6B7A8D",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(192,230,255,0.55) 0%, rgba(255,255,255,0) 70%)",
        "brand-gradient": "linear-gradient(135deg, #4DA2FF 0%, #6FBCF0 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
