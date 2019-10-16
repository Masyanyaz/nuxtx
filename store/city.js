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
  async fetchCity({commit, $axios}, payload) {
    console.log('fetchCity')
    commit('shared/clearError', null, {root: true})
    // commit('shared/setLoading', true, {root: true})
    let url = '?'
    for (let key in payload) {
      url += `${key}=${payload[key]}&`
    }
    await this.$axios.get(`/admin/api/getcity/${payload.language}${url.slice(0,-1)}`)
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