/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#0f172a',
          dark: '#0b0f19',
          card: '#131b2e',
          border: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
