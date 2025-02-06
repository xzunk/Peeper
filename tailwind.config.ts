import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "line-white": "#FFFFFF",
        "line-black": "#000000",
        "line-green": "#00C300",
        primary: "#00C300",
        secondary: "#00B300",
        tertiary: "#00A300",
        accent: "#1EAEDB",
        background: "#FFFFFF",
        foreground: "#1A1F2C",
        muted: "#8A898C",
        border: "#C8C8C9",
        input: "#F6F6F7",
        card: "#FFFFFF",
        "card-foreground": "#1A1F2C",
        success: "#15803d",
        warning: "#c2410c",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
