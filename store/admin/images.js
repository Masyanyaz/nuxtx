export const state = () => ({
  images: {
    previewImage: {
      image: null,
      src: ''
    },
    mainImage: {
      image: null,
      src: ''
    },
    galery: {
      image: [],
      src: []
    }
  }
})

export const mutations = {
  updateImages(state, payload) {
    state.images[payload.target] = payload.result
  },
  unsetImages(state) {
    state.images = {
      previewImage: {
        image: null,
        src: ''
      },
      mainImage: {
        image: null,
        src: ''
      },
      galery: {
        image: [],
        src: []
      }
    }
  }
}

export const actions = {
  async onFileChange({commit}, payload) {
    let src = [], image = [];

    for (let i = 0; i < payload.files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        if (payload.target === 'galery') {
          src.push(reader.result);
          image.push(payload.files[i])
        } else {
          src = reader.result;
          image = payload.files[i]
        }
      };
      reader.readAsDataURL(payload.files[i]);
    }
    setTimeout(() => commit('updateImages', {target: payload.target, result: {src, image}}), 100)
  }
}

export const getters = {
  images(state) {
    return state.images
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}