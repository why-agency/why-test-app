import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1920px'
    },
    colors: {
      primary1: {
        DEFAULT: '#312783',
        inverse: '#FAFAF9'
      },
      secondary1: {
        DEFAULT: '#FFED00',
        inverse: '#2B2B2B'
      },
      white: {
        DEFAULT: '#FAFAF9',
        inverse: '#2B2B2B'
      },
      black: '#2B2B2B'
    },
    fontFamily: {
      primary: ['var(--font-primary)'],
      secondary: ['var(--font-secondary)']
    },
    extend: {}
  },
  plugins: []
}

export default config