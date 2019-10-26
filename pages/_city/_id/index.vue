<template>
  <div v-if="!component">
    <ExcursionPage :exc="exc" :excursions="excursions"/>
  </div>
  <div v-else>
    <CityPage :city="city"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    async asyncData({store, params, error, route}) {
      let query = store.getters['filter/query']

      let component = false
      let city
      let filter
      const url = {
        language: store.state.locale,
        city_url: params.city,
        exc_url: params.id,
        category_url: !params.id ? '.*' : params.id !== 'all' ? params.id : '.*'
      };
      query.price_min ? url.price_min = query.price_min : false
      query.price_max ? url.price_max = query.price_max : false
      query.group_min ? url.group_min = query.group_min : false
      query.time_group ? url.time_group = JSON.parse(query.time_group) : false

      await store.dispatch('excursion/fetchExcursion', url)
      let exc = await store.getters['excursion/excByUrl'](params.id)
      if (exc === undefined) {
        if (store.getters['filter/filters'].length === 0) {
          await store.dispatch('filter/fetchFilters', url)
        }
        filter = await store.getters['filter/filterByUrl'](params.id)
        if (filter === undefined) {
          error({statusCode: 404})
        }
        if (store.getters['city/city'].length === 0 || store.getters['city/cityByUrl'](params.city).url !== params.city) {
          await store.dispatch('city/fetchCity', url)
        }
        city = await store.getters['city/cityByUrl'](params.city)

        await store.dispatch('excursion/fetchExcursions', url)

        component = true
      } else {
        await store.dispatch('excursion/fetchExcursions', url)
      }
      return {exc, component, city, filter}
    },
    head() {
      return {
        title: !this.component ? this.exc.title : this.filter.title,
        meta: [
          {
            hid: 'description', name: 'description', content: !this.component ? this.exc.description :
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
      // filtered() {
      //   let arr = [];
      //   this.excursions.forEach((a, i) => {
      //     a.type.forEach(r => {
      //       this.exc.type.includes(r) && this.exc.url !== a.url ? arr.push(a) : false
      //     })
      //   });
      //   return arr.slice(0, this.numberOfWidth)
      // },
      ...mapGetters({
        excursions: 'excursion/excursions',
      })
    },
    methods: {},
  }
</script>

<style scoped lang="scss">

</style>