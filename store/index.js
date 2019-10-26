import JWTDecode from 'jwt-decode'
import Cookieparser from 'cookieparser'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  city: '',
  isExc: null
})

export const mutations = {
  setLang (state, payload) {
    if (state.locales.includes(payload)) {
      state.locale = payload
    }
  },
  setCity (state, payload) {
    state.city = payload
  },
  setIsExc (state, payload) {
    state.isExc = payload
  }
}

export const actions = {
  nuxtServerInit({commit}, {req}) {
    commit('filter/loadQuery', req.query)
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;

    const parsed = Cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;

    if (!accessTokenCookie) return;

    const decoded = JWTDecode(accessTokenCookie);

    if (decoded) {
      commit('user/setUser', {
        email: decoded.email,
        uid: decoded.user_id
      })
    }
  },
  async fetchExcursuinOrFilter({commit}, payload) {
    console.log('fetchExcursuinOrFilter')
    commit('shared/clearError', null, {root: true})
    // commit('shared/setLoading', true, {root: true})
    let url = '?'
    for (let key in payload) {
      url += `${key}=${payload[key]}&`
    }
    await this.$axios.get(`/admin/api/excursuinorfilter/${payload.language}/${payload.id}${url.slice(0,-1)}`)
      .then((data) => {
        if(data.data.length === 1) {
          commit('setIsExc', true)
          commit('excursion/loadExcursion', data.data, {root: true})
        } else {
          commit('setIsExc', false)
          commit('filter/loadFilters', data.data, {root: true})
          // commit('shared/setLoading', false, {root: true})
        }
      })
      .catch(e => {
        commit('shared/setError', e.message, {root: true})
        // commit('shared/setLoading', false, {root: true})
        throw e;
      })
  }
}
