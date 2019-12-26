module.exports = {
  important: true,
  theme: {
    fontFamily: {
      display: ['Baskerville Old Face', 'sans-serif'],
      body: ['Baskerville Old Face', 'sans-serif'],
    },
    minWidth: {
      '20': '20%',
      '100': '100px',
    },
    maxWidth: {
      '20': '20%',
      '30': '30%',
      '50': '50%',
      '60': '60%',
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
        primary: '#677589',
        secondary: '#D0BB98',

        secondaryLight: '#D0BB98',
        secondaryLighter: '#FBECD4',
        secondaryDark: '#8A724A',
        secondaryDarker: '#725729',
        secondaryNormal: '#AD946B',
        
        primaryLight: '#677589',
        primaryLighter: '#8E98A5',
        primaryDark: '#34445B',
        primaryDarker: '#1F324B',
        primaryNormal: '#4A5B72',
      },
      margin: {
        '96': '24rem',
        '128': '32rem',
      },
      inset: {
        2: '2rem'
      }
    }
  },
  variants: {
    opacity: ['responsive', 'hover'],
    border: ['hover']
  }
}
