import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["forest", "emerald", "dark"],
  },
  theme: {
    extend: {
      colors: {},
      animation: {},
    },
  },
};

// module.exports = {
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: ["forest", "emerald"],
//   },
//   theme: {
//     extend: {
//       animation: {
//         "ping-slow": "ping 3s linear infinite",
//       },
//     },
//   },
// };
