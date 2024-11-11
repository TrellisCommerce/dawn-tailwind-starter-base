module.exports = {
  prefix: '',
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px',
      xl: '1440px',
      '2xl': '1920px',
      pageMaxWidth: '1624px',
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
        script: 'var(--font-script-family)',
        body: 'var(--font-body-family)',
      },
    },
  },
  plugins: [],
};
