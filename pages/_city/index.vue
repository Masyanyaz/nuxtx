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
          <div class="filter pl-4 pr-4">
            <v-chip-group
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
    <div style="width: 300px;">
      <v-subheader>Цена</v-subheader>
      <v-card-text>
        <v-range-slider
          v-model="priceFilter.value"
          :max="priceFilter.max"
          :min="priceFilter.min"
          thumb-label="always"
          thumb-size="24"
        ></v-range-slider>
      </v-card-text>
      <v-subheader>Количество человек</v-subheader>
      <div class="d-flex align-center ml-5">
        <span @click="groupSizeFilter !== 0 ? groupSizeFilter-- : 0" class="pointer" style="cursor: pointer;">-
        </span>
        <div style="border-radius: 100%; width: 25px; height: 25px; color: #ffffff;"
             class="primary d-flex justify-center align-center mr-3 ml-3">
          {{groupSizeFilter}}
        </div>
        <span @click="groupSizeFilter !== 6 ? groupSizeFilter++ : 6" class="pointer" style="cursor: pointer;">+</span>
      </div>
      <v-subheader>Время</v-subheader>
      <div>
        <input type="checkbox" class="ml-5" id="1" v-model="timeFilter" value="3">
        <label for="1">0-3</label>
      </div>
      <div>
        <input type="checkbox" class="ml-5" id="2" v-model="timeFilter" value="3-5">
        <label for="2">3-5</label>
      </div>
      <div>
        <input type="checkbox" class="ml-5" id="3" v-model="timeFilter" value="5-7">
        <label for="3">5-7</label>
      </div>
      <div>
        <input type="checkbox" class="ml-5" id="4" v-model="timeFilter" value="7">
        <label for="4">Full day 7+</label>
      </div>
    </div>
    {{timeFilter}}
    <ExcursionCards :excursions="filtered"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const ExcursionCards = () => import("~/components/Excursion/ExcursionCards");
  const CityEdit = () => import("~/components/City/CityEdit");

  export default {
    async asyncData({store, params, error, route}) {
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

      // let filter = JSON.parse(JSON.stringify(Object.values(route.query)).replace('metro', 'métro')) || [];
      return {city}
    },
    data() {
      return {
        priceFilter: {
          min: 0,
          max: 100,
          value: []
        },
        groupSizeFilter: 6,
        timeFilter: [],
        filter: '',
        showGalery: false,
        filterList: []
      }
    },
    created() {
      let arr = []
      let arrPrice = []
      this.excursions.forEach(a => {
        a.type.forEach(r => {
          arr.push(r)
        })
        a.timeGroup = this.timeGroup(a.time)
        arrPrice.push(a.price)
      })
      this.filterList = Array.from(new Set(arr))

      let unicArrPrice = Array.from(new Set(arrPrice))
      let min = this.priceFilter.min = Math.min(...unicArrPrice)
      let max = this.priceFilter.max = Math.max(...unicArrPrice)
      this.priceFilter.value = [min, max]
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
          this.$router.push({query: ''})
          return this.excursions.filter(a => a.price >= this.priceFilter.value[0] && a.price <=
            this.priceFilter.value[1] )
            // && a.groupSize == this.groupSizeFilter && this.timeFilter.includes(a.timeGroup)
        }
        if (this.filter.length === 0) {
          let arr = []
          this.excursions.forEach(a => {
            let is = false
            a.type.forEach(r => {
              is = this.filter.includes(r)
            });
            if (is && a.price >= this.priceFilter.value[0] && a.price <= this.priceFilter.value[1]) arr.push(a)
          });
          this.$router.push({query: JSON.parse(JSON.stringify(this.filter).replace('é', 'e'))})
          return Array.from(new Set(arr))
        }
      },
      ...mapGetters({
        excursions: 'excursion/excursions',
      })
    },
    methods: {
      timeGroup(time) {
        let t = time.split(' ')[0]
        let t1 = t.split('-')[0]
        let t2 = t.split('-')[1]
        if (t1 <= 3) return "0-3";
        if (t1 >= 3 && t1 <= 5) return "3-5";
        if (t1 >= 5 && t1 <= 7) return "5-7";
        if (t1 >= 7) return "7";
      }
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

  .filter {
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

</style>