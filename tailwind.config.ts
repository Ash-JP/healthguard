import type { Config } from 'tailwindcss'

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        heading: "hsl(var(--heading))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

