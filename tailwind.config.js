/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#3B82F6',
          'secondary': '#10B981',
          'accent': '#6366F1',
          'background': '#F3F4F6',
        },
        fontFamily: {
          'sans': ['Inter', 'system-ui', 'sans-serif'],
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    plugins: [],
  }