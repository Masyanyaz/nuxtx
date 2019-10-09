<template>
  <div>
    <v-card-actions v-if="isUserloggedIn" style="position: absolute; top: 0; right: 0;">
      <v-spacer></v-spacer>
      <CityEdit :city="city"></CityEdit>
    </v-card-actions>
    <v-layout row>
      <v-flex xs12>
        <div
          :style="{background: 'url(' + city.mainImage + ') no-repeat 50% 15% /cover'}"
          class="welcome-top"
        >
          <h1 class="welcome-top__text">{{city.h1}}</h1>
          <div class="filter">
            <v-chip-group
              multiple
              v-model="filter"
              column
              active-class="green lighten-1"
            >
              <v-chip filter v-for="(tag, i) in filterList" :key="i" :value="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <h2 class="d-flex justify-center mt-9 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('_city.excursion')}}
    </h2>
    <ExcursionCards :excursions="filtered"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const ExcursionCards = () => import("~/components/Excursion/ExcursionCards");
  const CityEdit = () => import("~/components/City/CityEdit");

  export default {
    async asyncData({store, params, error, route}) {
      let filter = Object.values(route.query) || [];

      // TODO Сделать условие, чтобы не обращалось каждый раз к бд
      const url = {
        language: store.state.locale,
        city: params.city
      };
      await store.dispatch('excursion/fetchExcursions', url)
      if (store.getters['city/cities'].length === 0) {
        await store.dispatch('city/fetchCities', url)
      }
      if (store.getters['city/cityByUrl'](params.city) === undefined) {
        error({statusCode: 404})
      }
      let city = await store.getters['city/cityByUrl'](params.city)
      return {city, filter}
    },
    data() {
      return {
        showGalery: false,
        filterList: [],
      }
    },
    created() {
      let arr = []
      this.excursions.forEach(a => {
        a.type.forEach(r => {
          arr.push(r)
        })
      })
      this.filterList = Array.from(new Set(arr))
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
      ExcursionCards,
      CityEdit
    },
    computed: {
      isUserloggedIn() {
        return this.$store.getters['user/isUserloggedIn']
      },
      filtered() {
        if (this.filter.length === 0) {
          this.$router.push({path: this.$route.path, query: ''})
          return this.excursions
        }
        let arr = []
        this.excursions.forEach(a => {
          a.type.forEach(r => {
            this.filter.includes(r) ? arr.push(a) : false
          })
        })
        this.$router.push({path: this.$route.path, query: this.filter})
        return Array.from(new Set(arr))
      },
      ...mapGetters({
        excursions: 'excursion/excursions',
      })
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