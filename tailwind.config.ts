import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        interrrr: ['var(--font-inter)', 'sans-serif'],
        ibmplexsans: ['var(--font-ibmplexsans)', 'sans-serif'],
      },

      backgroundImage: {
        gradient: "url('/static/background.png')",
        'custom-gradient': 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)',
      },

      colors: {
        red: {
          951: 'rgba(163, 54, 67, 1)',
        },
        purple: {
          951: 'rgba(79, 70, 229, 1)',
        },
        gray: {
          950: 'hsla(0, 0%, 100%, 0.7);',
          951: 'hsla(0, 0%, 100%, 0.4);',
          952: '#373b64',
        },
      },
    },
  },
  plugins: [],
};

export default config;
