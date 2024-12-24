/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'base': '18px',
      },
      colors: {
        'gray-light': '#bcbcbc',
        'gray-dark': '#333333',
        'yellow': '#f0ff08',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'tall': {'raw': '(min-height: 720px)'} // Add this line
      },
    },
  },
  plugins: [],
}

