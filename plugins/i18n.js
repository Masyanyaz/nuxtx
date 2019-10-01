export default ({ app, store }) => {
  const locale = app.i18n.locale;

  store.commit('setLang', locale)
}
