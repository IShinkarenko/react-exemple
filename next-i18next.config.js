const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'es', 'fr', 'pt'],
    defaultLocale: 'en',
    debug: false,
  },
  localePath: path.resolve('public/static/locales'),
  react: {
    useSuspense: false,
    wait: true,
  },
}
