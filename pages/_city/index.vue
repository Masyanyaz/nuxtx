<template>
  <div>
    <CityPage :city="city"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const CityPage = () => import('~/components/City/Page')


  export default {
    async asyncData({store, params, error, route}) {
      let query = store.getters['filter/query']
      // TODO Сделать условие, чтобы не обращалось каждый раз к бд
      const url = {
        language: store.state.locale,
        city_url: params.city
      };
      url.price_min = query.price_min || route.query.price_min || 0
      url.price_max = query.price_max || route.query.price_max || 10000
      url.group_min = query.group_min || route.query.group_min || 1
      url.time_min = query.time_min || route.query.time_min || 0
      url.time_max = query.time_max || route.query.time_max || 24
      if (store.getters['city/city'].length === 0 || store.getters['city/cityByUrl'](params.city).url !== params.city ||
        Object.keys(url).length !== 2) {
        await store.dispatch('city/fetchCity', url)
      }

      let city = await store.getters['city/cityByUrl'](params.city)
      if (store.getters['filter/filters'].length === 0) {
        await store.dispatch('filter/fetchFilters', url)
      }
      if (store.getters['excursion/excursions'].length !== city.excCount) {
        await store.dispatch('excursion/fetchExcursions', url)
      }
      if (city === undefined) {
        error({statusCode: 404})
      }

      // let filter = JSON.parse(JSON.stringify(Object.values(route.query)).replace('metro', 'métro')) || [];
      return {city}
    },
    head() {
      return {
        title: this.city.title,
        meta: [
          {hid: 'description', name: 'description', content: this.city.description}
        ]
      }
    },
    components: {
      CityPage
    },
  }
</script>

<style scoped lang="scss">
  .car-link {
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
    position: absolute;
  }

  .filter {
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

</style>