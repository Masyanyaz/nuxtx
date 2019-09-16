import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

class Ad {
  constructor(h1, name, url, title, description, language, imageSrc = '', id = null) {
    this.h1 = h1
    this.name = name
    this.url = url
    this.title = title
    this.description = description
    this.language = language
    this.imageSrc = imageSrc
    this.id = id
  }
}

export const state = () => ({
  ads: []
})

export const mutations = {
  createAd(state, payload) {
    state.ads.push(payload)
  },
  loadAds(state, payload) {
    state.ads = payload
  },
  updateAd(state, payload) {
    const ad = state.ads.find(a => {
      return a.id === payload.id
    })

    ad.h1 = payload.h1
    ad.price = payload.price
    ad.time = payload.time
    ad.groupSize = payload.groupSize
    ad.detailText = payload.detailText
    ad.included = payload.included
    ad.excluded = payload.excluded
    ad.name = payload.name
    ad.url = payload.url
    ad.title = payload.title
    ad.description = payload.description
  }
}

export const actions = {
  async createAd({commit, getters}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    const image = payload.image

    try {
      const newAd = new Ad(
        payload.h1,
        payload.name,
        payload.url,
        payload.title,
        payload.description,
        payload.language,
        '',
      )

      const ad = await fb.database().ref(`${newAd.language}/cities`).push(newAd)
      const imageExt = image.name.slice(image.name.lastIndexOf('.'))

      const fileData = await fb.storage().ref(`${newAd.language}/${newAd.url}.${imageExt}`).put(image)
      const imageSrc = await fileData.ref.getDownloadURL()

      fb.database().ref(`${newAd.language}/cities`).child(ad.key).update({
        imageSrc
      })
        .then(() => {
          // commit('setLoading', false)
          commit('createAd', {
            ...newAd,
            id: ad.key,
            imageSrc
          })
        })
    } catch (error) {
      // commit('setError', error.message)
      // commit('setLoading', false)
      throw error
    }
  },
  async fetchAds({commit}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    const resultAds = []

    try {
      const fbVal = await fb.database().ref(`${payload.language}/cities`).once('value')
      const ads = fbVal.val()

      Object.keys(ads).forEach(key => {
        const ad = ads[key]
        resultAds.push(
          new Ad(
            ad.h1,
            ad.name,
            ad.url,
            ad.title,
            ad.description,
            ad.language,
            ad.imageSrc,
            key
          )
        )
      })

      commit('loadAds', JSON.parse(JSON.stringify(resultAds)))
      // commit('setLoading', false)
    } catch (error) {
      // commit('setError', error.message)
      // commit('setLoading', false)
      throw error
    }

  },
  async updateAd ({commit}, payload) {
    // commit('clearError')
    // commit('setLoading', true)

    try {
      await fb.database().ref('ads').child(payload.id).update(payload)
      commit('updateAd', payload)
      // commit('setLoading', false)
    } catch (error) {
      // commit('setError', error.message)
      // commit('setLoading', false)
      throw error
    }
  }
}

export const getters = {
  ads(state) {
    return state.ads
  },
  promoAds(state) {
    return state.ads.filter(ad => {
      return ad.promo
    })
  },
  adByUrl(state) {
    return adUrl => {
      return state.ads.find(ad => ad.url === adUrl)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}