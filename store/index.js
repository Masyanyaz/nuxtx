import JWTDecode from 'jwt-decode'
import Cookieparser from 'cookieparser'

export const state = () => ({
  locale: 'en'
})

export const mutations = {
  setLang (state, payload) {
    state.locale = payload
  },
  setCity (state, payload) {
    state.city = payload
  }
}

export const actions = {
  nuxtServerInit({commit}, {req}) {
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
  }
}
