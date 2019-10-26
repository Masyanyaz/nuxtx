<template>
  <div>
    <h1 class="d-flex justify-center my-8" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('destinations.h1')}}
    </h1>
    <CityCards :cities="cities"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

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
        title: this.$t('destinations.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('destinations.description')}
        ]
      }
    },
    components: {
      CityCards: () => import("~/components/City/CityCards")
    }
  }
</script>

<style scoped>

</style>