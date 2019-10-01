const en = require('../locales/en')
const fr = require('../locales/fr')

// i18n config
const LOCALES = [
  {
    code: 'en',
    iso: 'en-US',
    name: 'English'
  },
  {
    code: 'fr',
    iso: 'fr-FR',
    name: 'Français'
  }
]
const DEFAULT_LOCALE = 'en'
const I18N = {
  en,
  fr
}

// Define custom paths for localized routes
// If a route/locale is omitted, defaults to Nuxt's generated path
const ROUTES_ALIASES = {

}

module.exports = {
  LOCALES,
  DEFAULT_LOCALE,
  I18N,
  ROUTES_ALIASES
}