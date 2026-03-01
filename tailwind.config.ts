import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canto: {
          deep: "#004D40",
          cream: "#FFFDD0",
        },
      },
      fontFamily: {
        sans: [
          "\"Noto Serif TC\"",
          "\"Source Han Serif TC\"",
          "\"Songti SC\"",
          "\"PMingLiU\"",
          "serif",
        ],
        jyutping: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0, 77, 64, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
