/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        site: "min(1600px, calc(100vw - 3rem))",
        content: "min(1400px, calc(100vw - 2rem))",
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      fontFamily: {
        sans: ["Aeonik", "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#fbfbfa",
          100: "#f4f4f2",
          200: "#e6e6e2",
          300: "#cfcfca",
          400: "#a8a8a2",
          500: "#7d7d78",
          600: "#565653",
          700: "#3a3a38",
          800: "#232322",
          900: "#151515",
          950: "#121212",
        },
        paper: {
          50: "#fbfbf9",
          100: "#f9f8f6",
          200: "#f7f6f3",
          300: "#f1f0ec",
        },
        accent: {
          indigo: "#3a39ff",
          teal: "#4fd6be",
          clay: "#b9856e",
          moss: "#6c857a",
          slate: "#6b7785",
        },
      },
      letterSpacing: {
        tightish: "-0.02em",
        editorial: "-0.035em",
        appEyebrow: "0.05em",
        appTab: "0.11em",
        appTitle: "-0.0095em",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(8,8,8,.10)",
        card: "0 16px 40px rgba(8,8,8,.08)",
        appScreen: "0 4px 40px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
        appCard: "10px",
        appTag: "40px",
      },
      backdropBlur: {
        appTab: "7.5px",
        appFade: "25px",
      },
      width: {
        "app-frame": "403px",
        "app-content": "369px",
        "app-card": "256px",
        "app-tab": "110px",
      },
      height: {
        "app-navbar": "64px",
        "app-tabbar": "80px",
        "app-card": "180px",
        "app-tag": "28px",
        "app-play": "98px",
      },
    },
  },
  plugins: [],
};

