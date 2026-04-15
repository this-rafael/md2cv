/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        serif: ["Georgia", "'Times New Roman'", "serif"],
      },
      colors: {
        neon: {
          purple: "hsl(265 90% 65%)",
          blue: "hsl(220 90% 60%)",
          pink: "hsl(330 85% 60%)",
          coral: "hsl(15 90% 60%)",
          green: "hsl(150 80% 50%)",
          yellow: "hsl(50 95% 60%)",
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-delay": "float 8s ease-in-out 2s infinite",
        "float-delay-2": "float 8s ease-in-out 4s infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "slide-up-delay": "slide-up 0.8s ease-out 0.2s forwards",
        "slide-up-delay-2": "slide-up 0.8s ease-out 0.4s forwards",
        "slide-up-delay-3": "slide-up 0.8s ease-out 0.6s forwards",
        shimmer: "shimmer 3s linear infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        "confetti-fall": "confetti-fall 1.5s ease-out forwards",
        typewriter: "typewriter 3s steps(30) forwards",
        blink: "blink 1s step-end infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "scale-bounce": "scale-bounce 0.4s ease",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        morph: "morph 8s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "particle-drift": "particle-drift 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "25%": {
            transform: "translateY(-20px) translateX(10px) scale(1.05)",
          },
          "50%": {
            transform: "translateY(-10px) translateX(-15px) scale(0.95)",
          },
          "75%": { transform: "translateY(-30px) translateX(5px) scale(1.02)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "scale-bounce": {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(265 90% 65% / 0.3)" },
          "50%": {
            boxShadow:
              "0 0 40px hsl(265 90% 65% / 0.6), 0 0 80px hsl(330 85% 60% / 0.3)",
          },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "particle-drift": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(100px, -50px) rotate(90deg)" },
          "50%": { transform: "translate(50px, -100px) rotate(180deg)" },
          "75%": { transform: "translate(-50px, -50px) rotate(270deg)" },
          "100%": { transform: "translate(0, 0) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
