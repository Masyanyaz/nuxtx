<template>
  <div>
    <h1 class="d-flex justify-center my-8" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('activities.h1')}}
    </h1>
    <ExcursionCards :excursions="excursions"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const ExcursionCards = () => import("~/components/Excursion/ExcursionCards");

  export default {
    head() {
      return {
        title: this.$t('activities.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('activities.description')}
        ]
      }
    },
    async asyncData({store}) {
      const url = {
        language: store.state.locale
      };
      await store.dispatch('excursion/fetchExcursions', url)
    },
    computed: mapGetters({
      loading: 'shared/loading',
      excursions: 'excursion/excursions',
    }),
    components: {
      ExcursionCards
    }
  }
</script>

<style scoped>

</style>