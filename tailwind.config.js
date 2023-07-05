const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-hubot)'],
      },
      keyframes: {
        gradient: {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'gradient 3s ease infinite alternate',
      },
    },
  },
  
  plugins: [require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      // this class is applied to `html` by `app/theme-efect.ts`, similar
      // to how `dark:` gets enabled
      addVariant("theme-system", ".theme-system &");
    }),
  ],
}
