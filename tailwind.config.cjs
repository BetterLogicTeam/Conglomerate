/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      10: ['10px', { lineHeight: '12px', letterSpacing: '-0.1px', fontWeight: '600' }],
      12: ['12px', { lineHeight: '26px', letterSpacing: '-0.1px', fontWeight: '500' }],
      12.5: ['12.5px', { lineHeight: '15px', letterSpacing: '-0.1px', fontWeight: '600' }],
      13.5: ['13.5px', { lineHeight: '16.3px', letterSpacing: '-0.1px', fontWeight: '600' }],
      15: ['15px', { lineHeight: '18px', letterSpacing: '-0.1px', fontWeight: '600' }],
      b_15: ['15px', { lineHeight: '18px', letterSpacing: '-0.1px', fontWeight: '700' }],
      16: ['16px', { lineHeight: '26px', letterSpacing: '-0.1px', fontWeight: '500' }],
      b_16: ['16px', { lineHeight: '26.5px', letterSpacing: '-0.1px', fontWeight: '700' }],
      18: ['18px', { lineHeight: '22px', letterSpacing: '0px', fontWeight: '700' }],
      19: ['19px', { lineHeight: '22px', letterSpacing: '0px', fontWeight: '700' }],
      22: ['22px', { lineHeight: '27px', letterSpacing: '0px', fontWeight: '700' }],
      24: ['24px', { lineHeight: '29px', letterSpacing: '0px', fontWeight: '700' }],

  },
    container: {
      center: true,
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1240px",
      // => @media (min-width: 1240px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
