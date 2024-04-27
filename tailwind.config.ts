import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dropbox: {
          background: "#F7F5F2",
          hover: "#EBE9E6",
          click: "#DFDCD8",
          border: "#BBB5AE"
        }
      },
      spacing: {
        "27": "6.75rem"
      }
    },
  },
  plugins: [],
};
export default config;
