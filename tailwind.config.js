/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
  },
  daisyui: {
    themes: [
      {
        oberon: {

          primary: "#1d3f65",

          secondary: "#efefef",

          tertiary: "#6b7280",

          accent: "#3b82f6",

          "accent-content": "#fff",

          neutral: "#56717d",

          "base-100": "#fff",

          info: "#00E7FF",

          success: "#00d287",

          "success-content": "#fff",

          warning: "#facc15",

          "warning-content": "#fff",

          error: "#ef4c53",

          "error-content": "#fff",

          light: "#fff",

          "light-content": "#242f3e",
        },
        dark: {
          primary: "#1d3f65",

          secondary: "#efefef",

          tertiary: "#294D76",

          accent: "#3b82f6",

          neutral: "#56717d",

          "base-100": "#242f3e",

          info: "#00E7FF",

          success: "#00d287",

          warning: "#facc15",

          error: "#ef4c53",

          disabled: "#3b82f6",

          "btn-disabled-content": "#fff",
        }
        // oberon: {

        //   primary: "#1d3f65",

        //   secondary: "#56717d",

        //   tertiary: "#294D76",

        //   accent: "#3b82f6",

        //   neutral: "#56717d",

        //   "base-100": "#294D76",

        //   info: "#00E7FF",

        //   success: "#5e8f32",

        //   warning: "#facc15",

        //   error: "#ff0000",
        // },
      },
      // "dark"
    ],
  },
  plugins: [require("daisyui")],
}