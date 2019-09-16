export default ({ app, store }) => {
  const locale = app.i18n.loadedLanguages[0]
  store.commit('setLang', locale)
}
