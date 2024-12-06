import type { Config } from 'tailwindcss'
import { createDynamicFontStyle } from './utils/typography'

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
      primary2: {
        DEFAULT: '#009FE3',
        inverse: '#FAFAF9'
      },
      secondary1: {
        DEFAULT: '#FFED00',
        inverse: '#2B2B2B'
      },
      secondary2: {
        DEFAULT: '#95C11F',
        inverse: '#FAFAF9'
      },
      secondary3: {
        DEFAULT: '#F9B000',
        inverse: '#FAFAF9'
      },
      secondary4: {
        DEFAULT: '#702283',
        inverse: '#FAFAF9'
      },
      tertiary1: {
        DEFAULT: '#FFF7B2',
        inverse: '#2B2B2B'
      },
      tertiary2: {
        DEFAULT: '#D9E6B1',
        inverse: '#2B2B2B'
      },
      tertiary3: {
        DEFAULT: '#FFE0A9',
        inverse: '#2B2B2B'
      },
      tertiary4: {
        DEFAULT: '#C1A5CF',
        inverse: '#FAFAF9'
      },
      tertiary5: {
        DEFAULT: '#A1DAF8',
        inverse: '#2B2B2B'
      },
      tertiary6: {
        DEFAULT: '#ADA9CD',
        inverse: '#FAFAF9'
      },
      white: {
        DEFAULT: '#FAFAF9',
        inverse: '#2B2B2B'
      },
      black: '#2B2B2B',
      gray: {
        100: '#F5F5F5',
        200: '#D2D2D2',
        300: '#737373'
      },
      error: '#D00707'
    },
    fontFamily: {
      primary: ['var(--font-primary)'],
      secondary: ['var(--font-secondary)']
    },
    extend: {
      fontSize: {
        h1: createDynamicFontStyle({
          minFontSize: 44,
          maxFontSize: 44,
          minPercentage: 0,
          maxPercentage: 0,
          fixedLineHeight: '120%',
          maxPageWidth: 1920,
          fontWeight: 'normal'
        }),
        h2: createDynamicFontStyle({
          minFontSize: 32,
          maxFontSize: 32,
          minPercentage: 0,
          maxPercentage: 0,
          fixedLineHeight: '120%',
          maxPageWidth: 1920,
          fontWeight: 'normal'
        }),
        h3: createDynamicFontStyle({
          minFontSize: 24,
          maxFontSize: 24,
          minPercentage: 0,
          maxPercentage: 0,
          fixedLineHeight: '120%',
          maxPageWidth: 1920,
          fontWeight: 'normal'
        }),
        h4: createDynamicFontStyle({
          minFontSize: 18,
          maxFontSize: 18,
          minPercentage: 0,
          maxPercentage: 0,
          fixedLineHeight: '120%',
          maxPageWidth: 1920,
          fontWeight: 'normal'
        }),
        p1: [
          '16px',
          {
            letterSpacing: '0%',
            lineHeight: '145%',
            fontWeight: 'normal'
          }
        ],
        p2: [
          '14px',
          {
            letterSpacing: '0%',
            lineHeight: '145%',
            fontWeight: 'normal'
          }
        ],
        p3: [
          '12px',
          {
            letterSpacing: '0%',
            lineHeight: '145%',
            fontWeight: 'normal'
          }
        ]
      }
    }
  },
  plugins: []
}

export default config