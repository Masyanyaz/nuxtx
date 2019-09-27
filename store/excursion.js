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

  async createExcursion({commit, getters}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    const image = payload.image

    try {
      const newExcursion = new Excursion(
        payload.h1,
        payload.price,
        payload.time,
        payload.groupSize,
        payload.type,
        payload.detailText,
        payload.included.split('\n'),
        payload.excluded.split('\n'),
        payload.name,
        payload.url,
        payload.title,
        payload.description,
        payload.city,
        payload.language,
        '',
        payload.dataCreated
      )

      const ref = await db.collection(`language/${newExcursion.language}/cities/${newExcursion.city}/excursion`).doc(newExcursion.url)
      ref.set(Object.assign({}, newExcursion))

      const imageExt = image.name.slice(image.name.lastIndexOf('.'))

      const fileData = await fb.storage().ref(`language/${newExcursion.language}/${newExcursion.url}.${imageExt}`).put(image)
      const imageSrc = await fileData.ref.getDownloadURL()

      ref.update({imageSrc})
        .then(() => {
          // commit('setLoading', false)
          commit('createExcursion', {
            ...newExcursion,
            imageSrc
          })
        })
    } catch (error) {
      // commit('setError', error.message)
      // commit('setLoading', false)
      throw error
    }
  },
  async fetchExcursions({commit}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

      // if (payload.city === undefined) {
      //   await this.$axios.get('/api/getexcursion')
      //     .then((data) => {
      //       commit('loadExcursions', data.data)
      //     })
      //     .catch(e => {
      //       console.log(e)
      //     })
      // } else {
      await this.$axios.get(`/api/getexcursion/${payload.language}/${payload.city}`)
        .then((data) => {
          commit('loadExcursions', data.data)
        })
        .catch(e => {
          console.log(e)
        })
      // }
      //   // commit('setError', error.message)
      //   // commit('setLoading', false)
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