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
        h3: ['32px', { lineHeight: '130%', fontWeight: '400' }],
        h4: ['24px', { lineHeight: '130%', fontWeight: '400' }],
        s1: ['24px', { lineHeight: '140%', fontWeight: '600' }],
        b1: ['32px', { lineHeight: '150%', fontWeight: '400' }],
        b2: ['24px', { lineHeight: '150%', fontWeight: '400' }],
        b3: ['18px', { lineHeight: '140%', fontWeight: '400' }],
        b4: ['16px', { lineHeight: '130%', fontWeight: '400' }],
        d1: ['14px', { lineHeight: '130%', fontWeight: '600' }],
      },
      colors: {
        primary: {
          900: '#2D336B',
          30: '#FAFAFA',
        },
        secondary: {
          blue: {
            50: '#EFF5FE',
            200: '#CBDAFA',
            300: '#ABC2F6',
            500: '#6D80E7',
            700: '#4249C0',
          },
        },
        warning: {
          40: 'rgba(81, 91, 218, 0.4)',
        },
        error: {
          default: '#DB0808',
        },
        grey: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          500: '#6D6D6D',
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
        'btn-medium': '250px',
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
      },
    },
  },
  plugins: [],
}
