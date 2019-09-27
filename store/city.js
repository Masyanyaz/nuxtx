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
  async createCity({commit, getters}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    // const image = payload.image
    //
      await this.$axios.post('/api/addcity')
        .then((data) => {
          commit('createCity', data.data)
        })
        .catch(e => {
          console.log(e)
        })

    //   const newCity = new City(
    //     payload.h1,
    //     payload.name,
    //     payload.url,
    //     payload.title,
    //     payload.description,
    //     payload.language,
    //     '',
    //     payload.dataCreated
    //   )
    //   const ref = await db.collection(`language/${newCity.language}/cities`).doc(newCity.url)
    //   ref.set(Object.assign({}, newCity))
    //
    //   const imageExt = image.name.slice(image.name.lastIndexOf('.'))
    //
    //   const fileData = await fb.storage().ref(`language/${newCity.language}/${newCity.url}.${imageExt}`).put(image)
    //   const imageSrc = await fileData.ref.getDownloadURL()
    //
    //   ref.update({imageSrc})
    //     .then(() => {
    //       // commit('setLoading', false)
    //       commit('createCity', {
    //         ...newCity,
    //         imageSrc
    //       })
    //     })
      // commit('setError', error.message)
      // commit('setLoading', false)
  },
  async fetchCities({commit, $axios}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    // const results = []

      await this.$axios.get(`/api/getcities/${payload.language}`)
        .then((data) => {
          commit('loadCities', data.data)
        })
        .catch(e => {
          console.log(e)
        })
      // const ref = await db.collection(`language/${payload.language}/cities`)
      // await ref.get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     results.push(doc.data())
      //   });
      //
      //   commit('loadCities', results)
      // }).catch(function (error) {
      //   console.log("Error getting document:", error);
      // });
      // commit('setError', error.message)
      // commit('setLoading', false)
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