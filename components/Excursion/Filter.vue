<template>
  <div>
    <v-container class="align-center justify-space-between pt-2 pb-2 d-md-flex d-none">
      <div class="mr-3">
        <div class="d-flex align-center">
          <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Hotel-layout" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
               stroke-linejoin="round">
              <g id="Room_Detail_1" transform="translate(-544.000000, -803.000000)" stroke="#5191FA">
                <g id="room-detail" transform="translate(0.000000, 211.000000)">
                  <g id="Group-3" transform="translate(135.000000, 562.000000)">
                    <g id="Group" transform="translate(409.000000, 30.000000)">
                      <g id="ico_adults">
                        <g id="Group" transform="translate(1.000000, 1.000000)">
                          <g id="Regular">
                            <circle id="Oval" cx="7" cy="4" r="4"></circle>
                            <path
                              d="M14,17 C14,13.1340068 10.8659932,10 7,10 C3.13400675,10 4.4408921e-16,13.1340068 0,17 L0,20 L3,20 L4,30 L10,30 L11,20 L14,20 L14,17 Z"
                              id="Shape"></path>
                            <path
                              d="M16,24 L18,24 L19,30 L25,30 L26,24 L30,24 L27,15 C26,12 24.7613333,10 22,10 C20.1015957,10.0018584 18.4126862,11.2059289 17.792,13"
                              id="Shape"></path>
                            <circle id="Oval" cx="22" cy="4" r="4"></circle>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div class="ml-3 mr-3"><b>{{$t('Excursion.ExcursionHeader.groupSize.title')}}</b></div>
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
          <svg width="32px" height="32px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
               stroke-linejoin="round">
              <g id="Tour_Detail_1" transform="translate(-134.000000, -1005.000000)" stroke="#5191FA">
                <g id="tour-detail" transform="translate(0.000000, 211.000000)">
                  <g id="feauture" transform="translate(135.000000, 765.000000)">
                    <g id="Group-3">
                      <g id="Group" transform="translate(0.000000, 25.000000)">
                        <g id="ico_clock" transform="translate(0.000000, 5.000000)">
                          <circle id="Oval" cx="16" cy="16" r="16"></circle>
                          <circle id="Oval" cx="16" cy="17.3333333" r="2.28571429"></circle>
                          <path d="M16,15.047619 L16,7.04761905" id="Shape"></path>
                          <path d="M17.6167619,18.9500952 L21.7142857,23.047619" id="Shape"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div class="ml-3 mr-3"><b>{{$t('Excursion.ExcursionHeader.duration.title')}}</b></div>
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
        <div class="d-flex align-center mb-4">
          <svg width="32px" height="32px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
               stroke-linejoin="round">
              <g id="Tour_Detail_1" transform="translate(-134.000000, -1005.000000)" stroke="#5191FA">
                <g id="tour-detail" transform="translate(0.000000, 211.000000)">
                  <g id="feauture" transform="translate(135.000000, 765.000000)">
                    <g id="Group-3">
                      <g id="Group" transform="translate(0.000000, 25.000000)">
                        <g id="ico_clock" transform="translate(0.000000, 5.000000)">
                          <circle id="Oval" cx="16" cy="16" r="16"></circle>
                          <circle id="Oval" cx="16" cy="17.3333333" r="2.28571429"></circle>
                          <path d="M16,15.047619 L16,7.04761905" id="Shape"></path>
                          <path d="M17.6167619,18.9500952 L21.7142857,23.047619" id="Shape"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div class="ml-3 mr-3"><b>Prix</b></div>
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
    <v-container class="d-flex justify-center">
      <v-btn
        color="primary"
        class="d-flex d-md-none"
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
      <div class="d-flex justify-space-between pt-2 pb-2 flex-column pr-5 pl-5 pt-5">
        <div class="mr-3 mb-5">
          <div class="d-flex align-center">
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Hotel-layout" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
                 stroke-linejoin="round">
                <g id="Room_Detail_1" transform="translate(-544.000000, -803.000000)" stroke="#5191FA">
                  <g id="room-detail" transform="translate(0.000000, 211.000000)">
                    <g id="Group-3" transform="translate(135.000000, 562.000000)">
                      <g id="Group" transform="translate(409.000000, 30.000000)">
                        <g id="ico_adults">
                          <g id="Group" transform="translate(1.000000, 1.000000)">
                            <g id="Regular">
                              <circle id="Oval" cx="7" cy="4" r="4"></circle>
                              <path
                                d="M14,17 C14,13.1340068 10.8659932,10 7,10 C3.13400675,10 4.4408921e-16,13.1340068 0,17 L0,20 L3,20 L4,30 L10,30 L11,20 L14,20 L14,17 Z"
                                id="Shape"></path>
                              <path
                                d="M16,24 L18,24 L19,30 L25,30 L26,24 L30,24 L27,15 C26,12 24.7613333,10 22,10 C20.1015957,10.0018584 18.4126862,11.2059289 17.792,13"
                                id="Shape"></path>
                              <circle id="Oval" cx="22" cy="4" r="4"></circle>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div class="ml-3 mr-3"><b>{{$t('Excursion.ExcursionHeader.groupSize.title')}}</b></div>
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
        <div class="mb-5">
          <div class="d-flex align-center">
            <svg width="32px" height="32px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
                 stroke-linejoin="round">
                <g id="Tour_Detail_1" transform="translate(-134.000000, -1005.000000)" stroke="#5191FA">
                  <g id="tour-detail" transform="translate(0.000000, 211.000000)">
                    <g id="feauture" transform="translate(135.000000, 765.000000)">
                      <g id="Group-3">
                        <g id="Group" transform="translate(0.000000, 25.000000)">
                          <g id="ico_clock" transform="translate(0.000000, 5.000000)">
                            <circle id="Oval" cx="16" cy="16" r="16"></circle>
                            <circle id="Oval" cx="16" cy="17.3333333" r="2.28571429"></circle>
                            <path d="M16,15.047619 L16,7.04761905" id="Shape"></path>
                            <path d="M17.6167619,18.9500952 L21.7142857,23.047619" id="Shape"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div class="ml-3 mr-3"><b>{{$t('Excursion.ExcursionHeader.duration.title')}}</b></div>
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
        <div class="mr-5 mb-5">
          <div class="d-flex align-center mb-4">
            <svg width="32px" height="32px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
                 stroke-linejoin="round">
                <g id="Tour_Detail_1" transform="translate(-134.000000, -1005.000000)" stroke="#5191FA">
                  <g id="tour-detail" transform="translate(0.000000, 211.000000)">
                    <g id="feauture" transform="translate(135.000000, 765.000000)">
                      <g id="Group-3">
                        <g id="Group" transform="translate(0.000000, 25.000000)">
                          <g id="ico_clock" transform="translate(0.000000, 5.000000)">
                            <circle id="Oval" cx="16" cy="16" r="16"></circle>
                            <circle id="Oval" cx="16" cy="17.3333333" r="2.28571429"></circle>
                            <path d="M16,15.047619 L16,7.04761905" id="Shape"></path>
                            <path d="M17.6167619,18.9500952 L21.7142857,23.047619" id="Shape"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div class="ml-3 mr-3"><b>Prix</b></div>
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