<template>
  <div>
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
            messages=""
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
            @click="isReset"
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
                    <span @click="groupSizeFilter > 1 ? groupSizeFilter-- : 1"
                          class="pointer"
                          style="cursor: pointer;">-
                    </span>
            <div style="border-radius: 100%; width: 25px; height: 25px; color: #ffffff;"
                 class="primary d-flex justify-center align-center mr-3 ml-3">
              {{groupSizeFilter}}
            </div>
            <span @click="groupSizeFilter < 6 ? groupSizeFilter++ : 6"
                  class="pointer"
                  style="cursor: pointer;">+</span>
          </div>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            text
            class=""
            @click="isReset"
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
          <v-chip-group
            v-model="timeFilter"
            multiple
            column
            active-class="green lighten-1"
          >
            <v-chip
              v-for="(tag, i) in timeItems"
              :key="i"
              :value="tag.value"
            >
              {{ tag.text }}
            </v-chip>
          </v-chip-group>
          <!--          <v-select-->
          <!--            v-model="timeFilter"-->
          <!--            :items="timeItems"-->
          <!--            deletable-chips-->
          <!--            return-object-->
          <!--            multiple-->
          <!--            small-chips-->
          <!--            style="max-width: 300px; min-width: 300px;"-->
          <!--            class="pt-0 mt-0"-->
          <!--            close-icon="+"-->
          <!--          >-->
          <!--          </v-select>-->
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            text
            class=""
            @click="isReset"
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
  </div>
</template>

<script>
  export default {
    props: ['city'],
    data() {
      return {
        cardFilter: null,
        timeItems: [
          {text: '0-3', value: [0, 3]},
          {text: '3-5', value: [3, 5]},
          {text: '5-7', value: [5, 7]},
          {text: 'Full day 7+', value: [7, 24]},
        ],
        timeFilter: [],
        groupSizeFilter: this.city.group_min,
        priceFilter: {
          min: this.city.price_min,
          max: this.city.price_max,
          value: [this.city.price_min, this.city.price_max]
        }
      }
    },
    methods: {
      async isFiltered() {
        this.cardFilter = null;
        let timeArr = Array.from(new Set(this.timeFilter.flat()))
        const url = {
          language: this.$store.state.locale,
          city_url: this.$route.params.city,
          price_min: this.priceFilter.value[0],
          price_max: this.priceFilter.value[1],
          group_min: this.groupSizeFilter,
          time_min: Math.min(...timeArr) != 'Infinity' ? Math.min(...timeArr) : 0,
          time_max: Math.max(...timeArr) != '-Infinity' ? Math.max(...timeArr) : 24,
          category_url: this.$route.params.id ? this.$route.params.id : '.*'
        }
        await this.$store.dispatch('filter/fetchFilters', url)
        await this.$store.dispatch('excursion/fetchExcursions', url)
        await this.$store.dispatch('filter/createQuery', url)
        let query = this.$store.getters['filter/query']

        this.$router.push({
          query: {
            price_min: url.price_min, price_max: url.price_max, group_min: url.group_min,
            time_min: url.time_min, time_max: url.time_max, category_url: url.category_url
          }
        })
      },
      async isReset() {
        this.cardFilter = null;
        this.$store.commit('filter/deleteQuery')
        const url = {
          language: this.$store.state.locale,
          city_url: this.$route.params.city,
          category_url: this.$route.params.id ? this.$route.params.id : '.*'
        }
        await this.$store.dispatch('city/fetchCity', url)
        await this.$store.dispatch('filter/fetchFilters', url)
        await this.$store.dispatch('excursion/fetchExcursions', url)
        await this.$store.dispatch('filter/createQuery', url)

        this.$router.push({query: {}})
      }
    },
    name: "ExcursionFilter"
  }
</script>

<style scoped>

</style>