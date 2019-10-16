<template>
  <div>
    <h2 class="d-flex justify-center mt-9 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('index.activities')}}
    </h2>
    <ExcursionCards :excursions="excursions"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const ExcursionCards = () => import("~/components/Excursion/ExcursionCards");

  export default {
    head() {
      return {
        title: this.$t('index.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('index.description')}
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