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
              <v-chip
                value="all"
              >
                All
                <span
                  class="ml-1"
                  style="font-weight: bold"
                >{{excursions.length}}</span>
              </v-chip>

              <v-chip
                v-for="(tag, i) in filters"
                :key="i"
                :value="tag.exc_type"
                :disabled="tag.exc_count === 0"
              >
                {{ tag.exc_type }}
                <span
                  class="ml-1"
                  style="font-weight: bold"
                >{{tag.exc_count}}</span>
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <!--<h2 class="d-flex justify-center mt-9 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('_city.excursion')}}
    </h2>-->
    <div>
      <v-btn
        text
        @click="cardFilter = cardFilter === 1 ? 0 : 1"
      >
        Цена
      </v-btn>
      <v-btn
        text
        @click="cardFilter = cardFilter === 2 ? 0 : 2"
      >
        Люди
      </v-btn>
      <v-btn
        text
        @click="cardFilter = cardFilter === 3 ? 0 : 3"
      >
        Время
      </v-btn>
    </div>
    <div style="position: relative;">
      <v-card
        style="position: absolute; z-index: 999999;"
        v-if="cardFilter === 1"
        max-width="344"
        width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Цена</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text class="pb-0">
          <v-range-slider
            messages="asd"
            v-model="priceFilter.value"
            :max="priceFilter.max"
            :min="priceFilter.min"
            thumb-label="always"
            thumb-size="24"
          ></v-range-slider>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            text
            class=""
            @click="priceFilter.value = [priceFilter.min, priceFilter.max]"
          >
            Reset
          </v-btn>
          <v-btn
            text
            class="ml-7"
            @click="isFiltered"
          >
            Filter
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        style="position: absolute; z-index: 999999; margin-left: 75px;"
        v-if="cardFilter === 2"
        max-width="344"
        width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content class="pb-0">
            <v-list-item-title class="headline mb-1">Количество человек</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text class="pb-2 pt-0">
          <div class="d-flex align-center justify-center">
              <span @click="groupSizeFilter > city.group_min ? groupSizeFilter-- : city.group_min"
                    class="pointer"
                    style="cursor: pointer;">-
              </span>
            <div style="border-radius: 100%; width: 25px; height: 25px; color: #ffffff;"
                 class="primary d-flex justify-center align-center mr-3 ml-3">
              {{groupSizeFilter}}
            </div>
            <span @click="groupSizeFilter < city.group_max ? groupSizeFilter++ : city.group_max"
                  class="pointer"
                  style="cursor: pointer;">+</span>
          </div>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            text
            class=""
            @click="groupSizeFilter = city.group_min"
          >
            Reset
          </v-btn>
          <v-btn
            text
            class="ml-7"
            @click="isFiltered"
          >
            Filter
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        style="position: absolute; z-index: 999999; margin-left: 150px;"
        v-if="cardFilter === 3"
        max-width="344"
        width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content class="pb-0">
            <v-list-item-title class="headline mb-1">Часы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text class="pb-0 pt-0">
          <v-select
            v-model="timeFilter"
            :items="timeItems"
            deletable-chips
            return-object
            multiple
            small-chips
            style="max-width: 300px; min-width: 300px;"
            class="pt-0 mt-0"
            close-icon="+"
          >
          </v-select>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            text
            class=""
            @click="timeFilter = []"
          >
            Reset
          </v-btn>
          <v-btn
            text
            class="ml-7"
            @click="isFiltered"
          >
            Filter
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
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
      await store.dispatch('filter/fetchFilters', url)
      await store.dispatch('excursion/fetchExcursions', url)
      if (store.getters['city/cities'].length === 0) {
        await store.dispatch('city/fetchCities', url)
      }
      if (store.getters['city/cityByUrl'](params.city) === undefined) {
        error({statusCode: 404})
      }
      let city = await store.getters['city/cityByUrl'](params.city)
      const priceFilter = {
        min: city.price_min,
        max: city.price_max,
        value: [city.price_min, city.price_max]
      }
      const groupSizeFilter = city.group_min

      // let filter = JSON.parse(JSON.stringify(Object.values(route.query)).replace('metro', 'métro')) || [];
      return {city, priceFilter, groupSizeFilter}
    },
    data() {
      return {
        timeItems: [
          {text: '0-3', min: '0', max: '3'},
          {text: '3-5', min: '3', max: '4'},
          {text: '5-7', min: '5', max: '7'},
          {text: 'Full day 7+', min: '7'},
        ],
        timeFilter: [],
        filter: 'all',
        showGalery: false,
        filterList: [],
        cardFilter: null
      }
    },
    created() {

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
        if (this.filter === 'all') return this.excursions
        return this.excursions.filter(a => a.exc_type.includes(this.filter))
      },
      ...mapGetters({
        excursions: 'excursion/excursions',
        filters: 'filter/filters',
      })
    },
    methods: {
      async isFiltered() {
        this.cardFilter = null;
        const url = {
          language: this.$store.state.locale,
          city: this.$route.params.city,
          price_min: this.priceFilter.value[0],
          price_max: this.priceFilter.value[1],
          group_min: this.groupSizeFilter,
          time_min: this.timeFilter.length ? this.timeFilter[0].min : 0,
          time_max: this.timeFilter.length ? this.timeFilter[this.timeFilter.length - 1].max : 24,
          exc_type: this.filter === 'all' ? '' : this.filter
        };
        await this.$store.dispatch('filter/fetchFilters', url)
        await this.$store.dispatch('excursion/fetchExcursions', url)
      },

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