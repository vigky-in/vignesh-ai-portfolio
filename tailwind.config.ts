import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0A0C10",
        surface2: "#0F1218",
        border: "rgba(255,255,255,0.08)",
        borderSoft: "rgba(255,255,255,0.05)",
        text: "#F5F6F8",
        muted: "#8B92A3",
        faint: "#565D6D",
        accent: "#3D8BFF",
        accentSoft: "rgba(61,139,255,0.14)",
        accent2: "#7B61FF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(61,139,255,0.12), transparent 40%)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 1.5s",
        grain: "grain 8s steps(10) infinite",
        blink: "blink 1.1s step-end infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-4%)" },
          "20%": { transform: "translate(3%,2%)" },
          "30%": { transform: "translate(-4%,1%)" },
          "40%": { transform: "translate(2%,-3%)" },
          "50%": { transform: "translate(-1%,4%)" },
          "60%": { transform: "translate(3%,-1%)" },
          "70%": { transform: "translate(-3%,3%)" },
          "80%": { transform: "translate(1%,-2%)" },
          "90%": { transform: "translate(-2%,-1%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
