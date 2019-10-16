<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <div
          :style="{background: 'url(' + city.mainImage + ') no-repeat 50% 15% /cover'}"
          class="welcome-top"
        >
          <h1 class="welcome-top__text">{{city.h1}}</h1>
        </div>
      </v-flex>
    </v-layout>
    <h2 class="d-flex justify-center mt-9 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      Category
    </h2>
    <CategoryCards :category="category"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const CategoryCards = () => import('~/components/Category/Cards')


  export default {
    async asyncData({store, params}) {
      const url = {
        language: store.state.locale,
        city_url: params.city
      };
      if (store.getters['filter/category'].length === 0 ||
        store.getters['city/cityByUrl'](params.city).url !== params.city) {
        await store.dispatch('filter/fetchCategory', url)
      }

      if (store.getters['city/city'].length === 0 ||
        store.getters['city/cityByUrl'](params.city).url !== params.city) {
        await store.dispatch('city/fetchCity', url)
      }
      let city = await store.getters['city/cityByUrl'](params.city)

      return {city}
    },
    head() {
      return {
        title: this.city.title,
        meta: [
          {hid: 'description', name: 'description', content: this.city.description}
        ]
      }
    },
    computed: {
      ...mapGetters({
        category: 'filter/category'
      })
    },
    components: {
      CategoryCards
    },
  }
</script>

<style scoped lang="scss">

</style>