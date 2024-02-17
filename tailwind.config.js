/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'transform': 'transform',
      },
      screens: {
        'phone': '375px',
        'tablet': '767px',
        'desktop': '1024px',
        'overscreen': '1700px'
      },
    },
    plugins: [],
  }
}