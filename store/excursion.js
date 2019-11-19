export const state = () => ({
  excursions: [],
  excursion: []
})

export const mutations = {
  createExcursion(state, payload) {
    state.excursions.push(payload)
  },
  loadExcursions(state, payload) {
    state.excursions = payload
  },
  loadExcursion(state, payload) {
    state.excursion = payload
  },
  updateExcursion(state, payload) {
    const exc = state.excursions.find(a => {
      return a.id === payload.id
    })

    exc.h1 = payload.h1
    exc.price = payload.price
    exc.time = payload.time
    exc.groupSize = payload.groupSize
    exc.detailText = payload.detailText
    exc.included = payload.included
    exc.excluded = payload.excluded
    exc.name = payload.name
    exc.url = payload.url
    exc.title = payload.title
    exc.description = payload.description
  }
}

export const actions = {

  async createExcursion({commit}, payload) {
    commit('shared/clearError', null, {root: true})
    commit('shared/setLoading', true, {root: true})

    await this.$axios.post('/admin/api/addexcursion', payload)
              .then(res => {
                commit('shared/setError', res.data, {root: true})
                commit('shared/setLoading', false, {root: true})
              })
              .catch(e => {
                commit('shared/setError', e.message, {root: true})
                commit('shared/setLoading', false, {root: true})
                throw e;
              })
  },
  async fetchExcursions({commit}, payload) {
    console.log('fetchExcursions')
    commit('shared/clearError', null, {root: true})
    commit('shared/setLoading', true, {root: true})
    let url = '?'
    for (let key in payload) {
      url += `${key}=${payload[key]}&`
    }
    await this.$axios.get(`/admin/api/getexcursions/${payload.language}${url}`)
              .then((data) => {
                commit('loadExcursions', data.data)
                commit('shared/setLoading', false, {root: true})
              })
              .catch(e => {
                commit('shared/setError', e.message, {root: true})
                commit('shared/setLoading', false, {root: true})
                throw e;
              })
  },
  async fetchExcursion({commit}, payload) {
    console.log('fetchExcursion')
    commit('shared/clearError', null, {root: true})
    // commit('shared/setLoading', true, {root: true})
    let url = '?'
    for (let key in payload) {
      url += `${key}=${payload[key]}&`
    }
    await this.$axios.get(`/admin/api/getexcursion/${payload.language}${url.slice(0, -1)}`)
              .then((data) => {
                commit('loadExcursion', data.data)
                // commit('shared/setLoading', false, {root: true})

              })
              .catch(e => {
                commit('shared/setError', e.message, {root: true})
                // commit('shared/setLoading', false, {root: true})
                throw e;
              })
  }
}

export const getters = {
  excursions(state) {
    return state.excursions
  },
  excursion(state) {
    return state.excursion
  },
  excByUrl(state) {
    return excUrl => {
      return state.excursion.find(exc => exc.url === excUrl)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}