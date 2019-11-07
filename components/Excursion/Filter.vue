<template>
  <div>
    <v-container class="align-center justify-space-between py-0 d-md-flex d-none">
      <div class="mr-3">
        <div class="d-flex align-center">
          <img src="/svg/groupSize.svg" alt="">
          <div class="ml-3 mr-3"><b>{{$t('commonWords.groupSize.title')}}</b></div>
        </div>
        <v-chip-group
          style="width: 350px; margin-left: -20px;"
          show-arrows
          v-model="groupSizeFilter"
          active-class="filter-number"
          class=""
          mandatory
        >
          <v-chip
            label
            v-for="i in 15"
            :key="i"
            :value="i"
            class="mr-2"
          >
            {{i}}
          </v-chip>
        </v-chip-group>
      </div>
      <div class="mr-3">
        <div class="d-flex align-center">
          <img src="/svg/duration.svg" alt="">
          <div class="ml-3 mr-3"><b>{{$t('commonWords.duration.title')}}</b></div>
        </div>
        <v-chip-group
          v-model="timeFilter"
          multiple
          active-class="filter-number"
        >
          <v-chip
            v-for="(tag, i) in timeItems"
            :key="i"
            :value="tag.value"
          >
            {{ tag.text }}
          </v-chip>
        </v-chip-group>
      </div>
      <div class="mr-5">
        <div class="d-flex align-center mb-4" style="margin-left: -4px;">
          <img src="/svg/euro.svg" alt="" width="24" height="24">
          <div class="mx-3"><b>{{$t('commonWords.price')}}</b></div>
        </div>
        <div class="d-flex align-center" style="width: 200px;">
          <v-range-slider
            class="slider"
            messages=""
            hide-details
            v-model="priceFilter.value"
            :max="priceFilter.max"
            :min="priceFilter.min"
            thumb-label="always"
            thumb-size="24"
          ></v-range-slider>
        </div>
      </div>
      <v-card-actions class="d-flex flex-column justify-center">
        <v-btn
          color="primary"
          @click="isFiltered"
        >
          Filter
        </v-btn>
        <v-btn
          text
          class="ml-0"
          @click="isReset"
        >
          Reset
        </v-btn>
      </v-card-actions>
    </v-container>
    <v-container class="d-flex justify-center d-md-none">
      <v-btn
        color="primary"
        class="d-flex"
        @click.stop="drawer = !drawer"
      >
        Filters
      </v-btn>
    </v-container>
    <v-navigation-drawer
      v-if="drawer"
      v-model="drawer"
      app
      right
      temporary
      width="350"
    >
      <div class="d-flex justify-space-between flex-column py-3 px-5">
        <v-btn text class="mb-5" @click.stop="drawer = !drawer">x</v-btn>
        <div class="mb-5">
          <div class="d-flex align-center">
            <img src="/svg/groupSize.svg" alt="">
            <div class="ml-3 mr-3"><b>{{$t('commonWords.groupSize.title')}}</b></div>
          </div>
          <v-chip-group
            style="width: 300px; margin-left: -20px;"
            show-arrows
            v-model="groupSizeFilter"
            active-class="filter-number"
            mandatory
          >
            <v-chip
              label
              v-for="i in 15"
              :key="i"
              :value="i"
              class="mr-2"
            >
              {{i}}
            </v-chip>
          </v-chip-group>
        </div>
        <div class="mb-5">
          <div class="d-flex align-center">
            <img src="/svg/duration.svg" alt="">
            <div class="ml-3 mr-3"><b>{{$t('commonWords.duration.title')}}</b></div>
          </div>
          <v-chip-group
            v-model="timeFilter"
            multiple
            active-class="filter-number"
          >
            <v-chip
              v-for="(tag, i) in timeItems"
              :key="i"
              :value="tag.value"
              style="font-size: calc(11px + 2 * ((100vw) / 1000))"
            >
              {{ tag.text }}
            </v-chip>
          </v-chip-group>
        </div>
        <div class="mr-5 mb-5">
          <div class="d-flex align-center mb-4">
            <img src="/svg/euro.svg" alt="" width="24" height="24">
            <div class="mx-3"><b>{{$t('commonWords.price')}}</b></div>
          </div>
          <div class="d-flex align-center" style="width: 200px; margin-left: 4px;">
            <v-range-slider
              class="slider"
              messages=""
              hide-details
              v-model="priceFilter.value"
              :max="priceFilter.max"
              :min="priceFilter.min"
              thumb-label="always"
              thumb-size="24"
            ></v-range-slider>
          </div>
        </div>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="primary"
            @click="isFiltered"
          >
            Filter
          </v-btn>
          <v-btn
            text
            class="ml-0"
            @click="isReset"
          >
            Reset
          </v-btn>
        </v-card-actions>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['city'],
    data() {
      return {
        groupSizeList: 0,
        drawer: false,
        cardFilter: null,
        timeItems: [
          {text: '0-3', value: 1},
          {text: '3-5', value: 2},
          {text: '5-7', value: 3},
          {text: 'Full day 7+', value: 4},
        ],
        timeFilter: [],
        groupSizeFilter: 4,
        priceFilter: {
          min: this.city.price_min,
          max: this.city.price_max,
          value: [this.city.price_min, this.city.price_max]
        }
      }
    },
    created() {
      if (Object.keys(this.query).length !== 0) {
        this.groupSizeFilter = +this.query.group_min;
        this.priceFilter.value = [this.query.price_min, this.query.price_max];
        this.timeFilter = this.query.time_group ? JSON.parse(this.query.time_group) : []
      }
    },
    computed: {
      ...mapGetters({
        query: 'filter/query'
      })
    },
    methods: {
      async isFiltered() {
        this.cardFilter = null;

        const url = {
          language: this.$store.state.locale,
          city_url: this.$route.params.city,
          price_min: this.priceFilter.value[0],
          price_max: this.priceFilter.value[1],
          group_min: this.groupSizeFilter,
          category_url: !this.$route.params.id ? '.*' : this.$route.params.id !== 'all' ? this.$route.params.id : '.*'
        }
        this.timeFilter.length !== 0 ? url.time_group = JSON.stringify(this.timeFilter) : false

        await this.$store.dispatch('filter/fetchFilters', url)
        await this.$store.dispatch('excursion/fetchExcursions', url)
        await this.$store.dispatch('filter/createQuery', url)
        let query = this.$store.getters['filter/query']

        this.$router.push({
          query: {
            price_min: query.price_min || this.$route.query.price_min,
            price_max: query.price_max || this.$route.query.price_max,
            group_min: query.group_min || this.$route.query.group_min,
            time_group: JSON.stringify(query.time_group) || ''
          }
        })
      },
      async isReset() {
        this.cardFilter = null;

        this.$store.commit('filter/deleteQuery')
        const url = {
          language: this.$store.state.locale,
          city_url: this.$route.params.city,
          category_url: this.$route.params.id !== 'all' ? this.$route.params.id : '.*'
        }
        await this.$store.dispatch('filter/fetchFilters', url)
        await this.$store.dispatch('excursion/fetchExcursions', url)
        this.timeFilter = [];
        this.groupSizeFilter = this.city.group_min;
        this.priceFilter = {
          min: this.city.price_min,
          max: this.city.price_max,
          value: [this.city.price_min, this.city.price_max]
        };

        this.$router.push({query: {}})
      }
    },
    name: "ExcursionFilter"
  }
</script>

<style scoped lang="scss">
  .filter-number {
    color: #ffffff;
    background-color: #5191FA !important;
  }

  .theme--light.v-chip:not(.v-chip--active) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: none;
  }
</style>