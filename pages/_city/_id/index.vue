<template>
  <div v-if="isExc">
    <ExcursionPage :exc="exc"/>
  </div>
  <div v-else>
    <CityPage :city="city"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    async asyncData({store, params, error}) {
      let query = store.getters['filter/query'];

      const url = {
        language: store.state.locale,
        city_url: params.city,
        id: params.id
      };
      query.price_min ? url.price_min = query.price_min : false;
      query.price_max ? url.price_max = query.price_max : false;
      query.group_min ? url.group_min = query.group_min : false;
      query.time_group ? url.time_group = JSON.parse(query.time_group) : false;

      try {
        await store.dispatch('fetchExcursuinOrFilter', url)
        let isExc = await store.state.isExc;

        if (isExc) {
          let exc = await store.getters['excursion/excByUrl'](params.id)
          await store.dispatch('excursion/fetchExcursions', url)
          return {exc, isExc}
        }

        url.category_url = !params.id ? '.*' : params.id !== 'all' ? params.id : '.*'

        if (store.getters['filter/filters'].length === 0) {
          await store.dispatch('filter/fetchFilters', url)
        }
        let filter = await store.getters['filter/filterByUrl'](params.id)

        if (store.getters['city/city'].length === 0 || store.getters['city/cityByUrl'](params.city).url !== params.city) {
          await store.dispatch('city/fetchCity', url)
        }
        let city = await store.getters['city/cityByUrl'](params.city)

        await store.dispatch('excursion/fetchExcursions', url)

        return {isExc, city, filter}
      } catch {
        error({statusCode: 404})
      }
    },
    head() {
      return {
        title: this.isExc ? this.exc.title : this.filter.title,
        meta: [
          {
            hid: 'description', name: 'description', content: this.isExc ? this.exc.description :
              this.filter.description
          }
        ]
      }
    },
    data() {
      return {}
    },
    components: {
      ExcursionPage: () => import('~/components/Excursion/Page'),
      CityPage: () => import('~/components/City/Page')
    },
    computed: {
      ...mapGetters({
        excursions: 'excursion/excursions',
      })
    },
    methods: {},
  }
</script>

<style scoped lang="scss">

</style>