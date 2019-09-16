export const state = () => ({
  loading: false,
  error: null
})

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  }
}

export const actions = {
  setLoading({commit}, payload) {
    commit('setLoading', payload)
  },
  setError({commit}, payload) {
    commit('setError', payload)
  },
  clearError({commit}) {
    commit('clearError')
  }
}

export const getters = {
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}