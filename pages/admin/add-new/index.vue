<template>
  <ExcursionAddNew :cities="cities" />
</template>

<script>
  import {mapGetters} from 'vuex'
  const ExcursionAddNew = () => import('@/components/Excursion/ExcursionAddNew')

  export default {
    async fetch({store}) {
      if (store.getters['city/cities'].length === 0) {
        const url = {
          language: store.state.locale
        };
        await store.dispatch('city/fetchCities', url)
      }
    },
    computed: mapGetters({
      cities: 'city/cities'
    }),
    components: {
      ExcursionAddNew
    }
    // async asyncData({$axios, store}) {
    //   $axios('/admin/api/getcities')
    //     .then((res) => {
    //       return {cities: res.data}
    //     })
    //     .catch(e => {
    //       throw e;
    //     })
      // $axios('/admin/api/getexcursion')
      //   .then((res) => {
      //     return {exc: res.data}
      //   })
      //   .catch(e => {
      //     throw e;
      //   })
    // }

  }

</script>