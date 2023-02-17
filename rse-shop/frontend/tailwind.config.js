/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'bg-c': '#F6F6F6',
        'white-c': '#FFFFFF',
        'black-c': '#232428',
        'gray-c': '#E1E1E1',
        success: '#22C55E',
        warning: '#FBBF24',
        info: '#3B82F6',
        error: '#F43F5E'
      },
      borderRadius: {
        rounded: '0.5rem',
        'rounded-md': '0.75rem',
        'rounded-xl': '1rem'
      },
      fontFamily: {
        saira: ['Saira', 'sans-serif']
      }
    }
  },
  plugins: []
};
