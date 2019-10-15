import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

export const state = () => ({
  filters: [],
  query: {}
})

export const mutations = {
  createFilter(state, payload) {
    state.filters.push(payload)
  },
  loadFilters(state, payload) {
    state.filters = payload
  },
  loadQuery(state, payload) {
    state.query = payload
  },
  deleteQuery(state) {
    state.query = {}
  },
  updateFilter(state, payload) {
    const exc = state.filters.find(a => {
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
  async createQuery({commit}, payload) {
    commit('loadQuery', payload)
  },
  async createFilter({commit}, payload) {
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
  async fetchFilters({commit}, payload) {
console.log('fetchFilters')
    commit('shared/clearError', null, {root: true})
    commit('shared/setLoading', true, {root: true})
    let url = '?'
    for (let key in payload) {
      url += `${key}=${payload[key]}&`
    }
    await this.$axios.get(`/admin/api/getfilterlist/${payload.language}${url}`)
      .then((data) => {
        commit('loadFilters', data.data)
        commit('shared/setLoading', false, {root: true})
      })
      .catch(e => {
        commit('shared/setError', e.message, {root: true})
        commit('shared/setLoading', false, {root: true})
        throw e;
      })
  },
  async updateExcursion({commit}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    try {
      await fb.database().ref('ads').child(payload.id).update(payload)
      commit('updateExcursion', payload)
      // commit('setLoading', false)
    } catch (error) {
      // commit('setError', error.message)
      // commit('setLoading', false)
      throw error
    }
  }
}

export const getters = {
  filters(state) {
    return state.filters
  },
  query(state) {
    return state.query
  },
  filterByUrl(state) {
    return excUrl => {
      return state.filters.find(flt => flt.url === excUrl)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}