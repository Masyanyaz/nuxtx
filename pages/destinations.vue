<template>
  <div>
    <h1 class="d-flex justify-center mt-7 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('destinations.h1')}}
    </h1>
    <CityCards :cities="cities"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const CityCards = () => import("~/components/City/CityCards")

  export default {
    async asyncData({store}) {
      const url = {
        language: store.state.locale,
      };
      if (store.getters['city/cities'].length === 0) {
        await store.dispatch('city/fetchCities', url)
      }
    },
    computed: mapGetters({
      loading: 'shared/loading',
      user: 'user/user',
      cities: 'city/cities'
    }),
    head() {
      return {
        title: this.$t('index.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('index.description')}
        ]
      }
    },
    components: {
      CityCards
    }
  }
</script>

<style scoped>

</style>