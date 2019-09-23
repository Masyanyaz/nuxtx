<template>
  <ExcursionAddNew :cities="cities"/>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ExcursionAddNew from '@/components/Excursion/ExcursionAddNew'

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
  }

</script>