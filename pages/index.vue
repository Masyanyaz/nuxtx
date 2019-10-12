<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <div class="welcome-top">
          <h1 class="welcome-top__text">{{$t('index.h1')}}</h1>
        </div>
      </v-flex>
    </v-layout>
    <h2 class="d-flex justify-center mt-9 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      Trending Activities
    </h2>
    <ExcursionCards :excursions="excursions"/>
    <h2 class="d-flex justify-center mt-9 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('index.topDestinations')}}
    </h2>
    <CityCards :cities="cities"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const CityCards = () => import("~/components/City/CityCards")
  const ExcursionCards = () => import("~/components/Excursion/ExcursionCards");

  export default {
    async asyncData({store, params, error, route}) {
      const url = {
        language: store.state.locale,
        city: 'saint-petersbourg',
        order: 'popular',
        sort: 'desc',
        limit: 8
      };
      await store.dispatch('excursion/fetchExcursions', url)
    },
    async fetch({store}) {
      if (store.getters['city/cities'].length === 0) {
        const url = {
          language: store.state.locale
        };
        await store.dispatch('city/fetchCities', url)
      }
    },
    data() {
      return {}
    },
    head() {
      return {
        title: this.$t('index.title'),
        meta: [
          {hid: 'description', name: 'description', content: this.$t('index.description')}
        ]
      }
    },
    computed: mapGetters({
      loading: 'shared/loading',
      user: 'user/user',
      cities: 'city/cities',
      excursions: 'excursion/excursions',
    }),
    components: {
      CityCards,
      ExcursionCards
    }
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

  .welcome-top {
    background: url('/image/home/noel-garanti.jpg') no-repeat 50% 15% / cover;
  }
</style>
