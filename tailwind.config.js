/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#110C23',
        'dark-secondary': '#352D55',
        'dark-third' : '#A193D4',
        'dark-input-bg': '#E3DBFF',
        'dark-text': '#E3DBFF',
        'dark-text-2': '#2A1F55',
        'p4': '#7F5CFF',
      }
    },
  },
  plugins: [],
}

