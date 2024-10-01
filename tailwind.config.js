/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/views/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

