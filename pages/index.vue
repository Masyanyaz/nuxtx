<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <div class="welcome-top">
          <h1 class="welcome-top__text">{{$t('index.h1')}}</h1>
        </div>
      </v-flex>
    </v-layout>
    <h2 class="d-flex justify-center my-8">
      {{$t('index.activities')}}
    </h2>
    <ExcursionCards :excursions="excursions"/>
    <h2 class="d-flex justify-center my-8">
      {{$t('index.topDestinations')}}
    </h2>
    <CityCards :cities="citiesFilter"/>
    <Blog class="mt-10"/>
    <div style="background-color: #fff;" class="py-3 my-8">
      <h2 class="d-flex justify-center">
        {{$t('index.reviews')}}
      </h2>
      <Reviews/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    async asyncData({store}) {
      const url = {
        language: store.state.locale,
        order: 'excursion.popular',
        sort: 'desc',
        limit: 8
      };
      await store.dispatch('excursion/fetchExcursions', url)
      if (store.getters['city/cities'].length === 0) {
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
    computed: {
      citiesFilter() {
        return this.cities.filter(a => a.excCount !== 1)
      },
      ...mapGetters({
        cities: 'city/cities',
        excursions: 'excursion/excursions',
      })
    },
    components: {
      CityCards: () => import("~/components/City/CityCards"),
      ExcursionCards: () => import("~/components/Excursion/ExcursionCards"),
      Blog: () => import("~/components/Blog"),
      Reviews: () => import("~/components/Reviews")
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

  h2 {
    font-size: calc(17px + 2 * ((100vw) / 200));
  }
</style>
