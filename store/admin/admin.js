export const state = () => ({
  message: {
    preview: {
      image: 'asd',
      src: ''
    },
  }
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
    state.message = payload
  }
}

export const actions = {

}

export const getters = {
  message(state) {
    return state.message
  },
  city(state) {
    return state.images
  },
  cityByUrl(state) {
    return cityUrl => {
      return state.images.find(city => city.url === cityUrl)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}