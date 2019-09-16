import * as fb from 'firebase/app'
import 'firebase/auth'
import Cookie from 'js-cookie'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async loginUser({commit}, payload) {
    // commit('clearError')
    // commit('setLoading', true)
    try {
      await fb.auth().signInWithEmailAndPassword(payload.email, payload.password);

      const token = await fb.auth().currentUser.getIdToken();
      const {email, uid} = fb.auth().currentUser;

      Cookie.set('access_token', token);

      commit('setUser', {email, uid});
      // commit('setLoading', false)
    } catch (error) {
      // commit('setLoading', false)
      // commit('setError', error.message)
      throw error
    }
  },
  async logoutUser({commit}) {
    await fb.auth().signOut();
    await Cookie.remove('access_token');
    commit('setUser', null)
  },
  autoLoginUser() {
    if(Cookie.get('access_token')) {
      state.user = true
    }
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  isUserloggedIn(state) {
    return state.user !== null
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}