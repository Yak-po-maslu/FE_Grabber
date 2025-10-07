const { error } = require('console')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        kyiv: ['"KyivTypeTitling"', 'sans-serif'],
      },
      fontSize: {
        h1: ['57px', { lineHeight: '140%', fontWeight: '600' }],
        h2: ['48px', { lineHeight: '140%', fontWeight: '500' }],
        h21: ['42px', { lineHeight: '140%', fontWeight: '700' }],
        h31: ['32px', { lineHeight: '130%', fontWeight: '600' }],
        h3: ['32px', { lineHeight: '130%', fontWeight: '400' }],
        h4: ['24px', { lineHeight: '130%', fontWeight: '400' }],
        s1: ['24px', { lineHeight: '140%', fontWeight: '500' }],
        b1: ['32px', { lineHeight: '150%', fontWeight: '400' }],
        b2: ['24px', { lineHeight: '150%', fontWeight: '400' }],
        b3: ['18px', { lineHeight: '140%', fontWeight: '400' }],
        b4: ['16px', { lineHeight: '130%', fontWeight: '400' }],
        d1: ['14px', { lineHeight: '130%', fontWeight: '400' }],
      },
      colors: {
        primary: {
          950: '#821404',
          50: '#FBF7F1',
          30: '#FAFAFA',
        },
        secondary: {
          blue: {
            50: '#EFF5FE',
            200: '#CBDAFA',
            300: '#ABC2F6',
            400: '#89A1F0',
            500: '#6D80E7',
            600: '#515BDA',
            700: '#4249C0',
            800: '#383F9B',
          },
          brown: {
            900: '#643C2A',
            950: '#361E14',
            100: '#F6ECDE',
            300: '#DFBB92',
            700: '#9A5734',
            50: '#FBF7F1',
          },
        },
        warning: {
          40: 'rgba(81, 91, 218, 0.4)',
          notification: {
            300: '#ECE05B',
          },
        },
        error: {
          default: '#DB0808',
        },
        grey: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#BDBDBD',
          400: '#A6A6A6',
          500: '#6D6D6D',
          600: '#5D5D5D',
          800: '#454545',
          950: '#080808',
        },
        transp: {
          600: 'rgba(81, 91, 218, 0.4)',
          800: 'rgba(56, 63, 155, 0.4)',
          50: 'rgba(250, 250, 250, 0.4)',
        },
      },
      minWidth: {
        'btn-small': '100px',
        'btn-medium': '285px',
        'btn-large': '350px',
        'profile-button': '15.875rem',
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        90: '22.5rem',
      },
      borderWidth: {
        0.5: '0.5px',
      },
      boxShadow: {
        blur: '0px 4px 26.2px 0px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'warning-icon': "url('./src/assets/icons/exclamation-icon.svg')",
        'bg-news': "url('/src/assets/images/BG.jpg')",
      },
    },
    keyframes: {
      slide1: {
        '0%': { transform: 'translateY(-100%)' },
        '50%': { transform: 'translateY(100%)' },
        '100%': { transform: 'translateY(100%)' },
      },
      slide2: {
        '0%': { transform: 'translateY(-200%)' },
        '50%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(200%)' },
      },
      arrowFlowLeft: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0)' },
      },
      arrowFlowRight: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(0)' },
      },
    },
    animation: {
      slide1: 'slide1 17s linear infinite',
      slide2: 'slide2 17s linear infinite',
      'arrow-left': 'arrowFlowLeft 6s linear infinite',
      'arrow-right': 'arrowFlowRight 6s linear infinite',
    },
  },
  plugins: [],
}
