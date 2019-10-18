<template>
  <div v-if="!component">
    <ExcursionPage :exc="exc" />
  </div>
  <div v-else>
    <CityPage :city="city" :filter="filter"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const ExcursionPage = () => import('~/components/Excursion/Page')
  const CityPage = () => import('~/components/City/Page')

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
      query.time_min ? url.time_min = query.time_min : false
      query.time_max ? url.time_max = query.time_max : false

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
        if (store.getters['city/city'].length === 0 ||
          store.getters['city/cityByUrl'](params.city).url !== params.city) {
          await store.dispatch('city/fetchCity', url)
        }
        city = await store.getters['city/cityByUrl'](params.city)

        await store.dispatch('excursion/fetchExcursions', url)

        component = true
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
      ExcursionPage,
      CityPage
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
      ...mapGetters({})
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  .welcome-top {
    &:before {
      background: none;
    }
  }

  .fix {
    position: fixed;
    top: 0;
    right: 5%;
    margin-top: 12px;
  }

  .abs {
    position: absolute;
    right: 5%;
  }

  h2 {
    margin-top: 25px;
    margin-bottom: 15px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 30px;
  }

  .car-link {
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
    position: absolute;
  }

  .included {
    max-width: 600px;

    &-item {
      margin-top: 10px;
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  .hr {
    border-top: 2px solid #D7DCE3;
    margin-top: 25px;
  }
</style>