/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
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