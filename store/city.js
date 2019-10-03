import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import {db} from "../plugins/firebase";

class City {
  constructor(h1, name, url, title, description, language, imageSrc = '', dataCreated = Date.now()) {
    this.h1 = h1
    this.name = name
    this.url = url
    this.title = title
    this.description = description
    this.language = language
    this.imageSrc = imageSrc
    this.dataCreated = dataCreated
  }
}

export const state = () => ({
  cities: []
})

export const mutations = {
  createCity(state, payload) {
    state.cities.push(payload)
  },
  loadCities(state, payload) {
    state.cities = payload
  },
  updateCity(state, payload) {
    const city = state.cities.find(a => {
      return a.id === payload.id
    })

    city.h1 = payload.h1
    city.price = payload.price
    city.time = payload.time
    city.groupSize = payload.groupSize
    city.detailText = payload.detailText
    city.included = payload.included
    city.excluded = payload.excluded
    city.name = payload.name
    city.url = payload.url
    city.title = payload.title
    city.description = payload.description
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
  async updateCity({commit}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    try {
      await fb.database().ref('cities').child(payload.id).update(payload)
      commit('updateCity', payload)
      // commit('setLoading', false)
    } catch (error) {
      // commit('setError', error.message)
      // commit('setLoading', false)
      throw error
    }
  }
}

export const getters = {
  cities(state) {
    return state.cities
  },
  cityByUrl(state) {
    return cityUrl => {
      return state.cities.find(city => city.url === cityUrl)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}