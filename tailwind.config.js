/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {

    extend: {
       gridTemplateRows: {
        layout: '100px 1fr 100px' 
      },
      gridTemplateColumns: {
        layout: '20% 80%' 
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        accent: 'var(--accent)'
      },
      fontFamily: {
        kurale: ['Kurale', 'serif'],
        jah: ['Just Another Hand', 'serif']
      },
      customTransition: {
        DEFAULT: 'var(--transition)'
      },

      transitionDuration: {
        DEFAULT: '333ms'
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      }
    }
  },
  plugins: []
};
