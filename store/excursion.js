import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import {db} from "../plugins/firebase";

class Excursion {
  constructor(h1, price, time, groupSize, type, detailText, included, excluded, name, url, title, description, city, language, imageSrc = '', dataCreated = Date.now()) {
    this.h1 = h1
    this.price = price
    this.time = time
    this.groupSize = groupSize
    this.type = type
    this.detailText = detailText
    this.included = included
    this.excluded = excluded
    this.name = name
    this.url = url
    this.title = title
    this.description = description
    this.city = city
    this.language = language
    this.imageSrc = imageSrc
    this.dataCreated = dataCreated
  }
}

export const state = () => ({
  excursions: []
})

export const mutations = {
  createExcursion(state, payload) {
    state.excursions.push(payload)
  },
  loadExcursions(state, payload) {
    state.excursions = payload
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
    commit('shared/clearError', null, {root: true})
    commit('shared/setLoading', true, {root: true})
    await this.$axios.get(`/admin/api/getexcursion/${payload.language}/${payload.city}`)
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
  excursions(state) {
    return state.excursions
  },
  excByUrl(state) {
    return excUrl => {
      return state.excursions.find(exc => exc.url === excUrl)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}