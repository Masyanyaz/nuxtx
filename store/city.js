export const state = () => ({
  cities: [],
  city: []
})

export const mutations = {
  createCity(state, payload) {
    state.cities.push(payload)
  },
  loadCities(state, payload) {
    state.cities = payload
  },
  loadCity(state, payload) {
    state.city = payload
  },
  updateCity(state, payload) {
    const exc = state.cities.find(a => {
      return a.id === payload.id
    })
    Object.assign(payload, exc)
  }
}

export const actions = {
  async createCity({commit}, payload) {
    commit('shared/clearError', null, {root: true})
    commit('shared/setLoading', true, {root: true})

    await this.$axios.post('/admin/api/addcity', payload)
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
  async fetchCities({commit, $axios}, payload) {
    console.log('fetchCities')
    commit('shared/clearError', null, {root: true})
    commit('shared/setLoading', true, {root: true})

    await this.$axios.get(`/admin/api/getcities/${payload.language}`)
              .then((data) => {
                commit('loadCities', data.data)
                commit('shared/setLoading', false, {root: true})
              })
              .catch(e => {
                commit('shared/setError', e.message, {root: true})
                commit('shared/setLoading', false, {root: true})
                throw e;
              })
  },
  async fetchAllCities({commit, $axios}, payload) {
    console.log('fetchAllCities')
    commit('shared/clearError', null, {root: true})
    commit('shared/setLoading', true, {root: true})

    await this.$axios.get(`/admin/api/allcity/`)
              .then((data) => {
                commit('loadCities', data.data)
                commit('shared/setLoading', false, {root: true})
              })
              .catch(e => {
                commit('shared/setError', e.message, {root: true})
                commit('shared/setLoading', false, {root: true})
                throw e;
              })
  },
  async fetchCity({commit, $axios}, payload) {
    console.log('fetchCity')
    commit('shared/clearError', null, {root: true})
    // commit('shared/setLoading', true, {root: true})
    let url = '?'
    for (let key in payload) {
      url += `${key}=${payload[key]}&`
    }
    await this.$axios.get(`/admin/api/getcity/${payload.language}${url.slice(0, -1)}`)
              .then((data) => {
                commit('loadCity', data.data)
                // commit('shared/setLoading', false, {root: true})
              })
              .catch(e => {
                commit('shared/setError', e.message, {root: true})
                // commit('shared/setLoading', false, {root: true})
                throw e;
              })
  },
  async fetchFullCity({commit, $axios}, payload) {
    console.log('fetchFullCity')
    commit('shared/clearError', null, {root: true})
    // commit('shared/setLoading', true, {root: true})
    let url = '?'
    for (let key in payload) {
      url += `${key}=${payload[key]}&`
    }
    await this.$axios.get(`/admin/api/getfullcity/${payload.language}${url.slice(0, -1)}`)
              .then((data) => {
                commit('loadCity', data.data)
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
  cities(state) {
    return state.cities
  },
  city(state) {
    return state.city
  },
  cityByUrl(state) {
    return cityUrl => {
      return state.city.find(city => city.url === cityUrl)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}