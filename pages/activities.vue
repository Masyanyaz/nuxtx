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
      excursions: 'excursion/excursions',
    }),
    components: {
      ExcursionCards: () => import("~/components/Excursion/ExcursionCards")
    }
  }
</script>

<style scoped>

</style>