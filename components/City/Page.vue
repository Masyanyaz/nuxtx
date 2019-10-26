<template>
  <div>
    <v-card-actions v-if="isUserloggedIn" style="position: absolute; top: 0; right: 0;">
      <v-spacer></v-spacer>
      <CityEdit :city="city"></CityEdit>
    </v-card-actions>
    <v-layout>
      <v-flex xs12>
        <div
          :style="{background: 'url(' + city.mainImage + ') no-repeat 50% 15% /cover'}"
          class="welcome-top"
        >
          <h1 class="welcome-top__text">{{city.h1}}</h1>
          <div class="filter d-md-flex d-none container">
            <v-chip-group
              column
              active-class="green lighten-1"
              mandatory
            >
              <v-chip
                v-for="(tag, i) in filters"
                :key="i"
                :disabled="tag.exc_count === 0"
                :to="$i18n.path(`${city.url}/${tag.url}`)"
              >
                {{ tag.name }}
                <span
                  class="ml-1 font-weight-bold"
                >
                  {{tag.exc_count}}
                </span>
              </v-chip>
            </v-chip-group>
          </div>
          <div class="filter px-4 d-flex d-md-none">
            <div class="d-flex flex-column justify-center align-center">
              <h4 style="color: #ffffff; margin-top: -40px; font-size: 28px;">{{filter.name}}</h4>
              <p style="color: #ffffff; font-size: 20px;">{{filter.exc_count}} {{$t('commonWords.excursion')}}</p>
              <v-chip
                color="green lighten-1"
                @click="drawer = !drawer"
              >
                Выбрать категорию
              </v-chip>
            </div>
            <v-navigation-drawer
              class="d-flex"
              v-if="drawer"
              v-model="drawer"
              app
            >
              <v-list dense>
                <v-list-item
                  v-for="(tag, i) in filters"
                  :key="i"
                  :to="$i18n.path(`${city.url}/${tag.url}`)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ tag.name }}
                      <span
                        class="ml-1"
                        style="font-weight: bold"
                      >
                        {{tag.exc_count}}
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <!--<h2 class="d-flex justify-center mt-9 mb-7" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('_city.excursion')}}
    </h2>-->
    <ExcursionFilter :city="city" class="my-5"/>
    <ExcursionCards :excursions="excursions"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['city'],
    data() {
      return {
        drawer: false,
        showGalery: false,
        filterList: [],
        count: null
      }
    },

    components: {
      ExcursionCards: () => import("~/components/Excursion/ExcursionCards"),
      CityEdit: () => import("~/components/City/CityEdit"),
      ExcursionFilter:() => import("~/components/Excursion/Filter")
    },

    created() {
      this.$router.push({
        path: this.$router.path,
        query: {
          price_min: this.query.price_min || this.$route.query.price_min,
          price_max: this.query.price_max || this.$route.query.price_max,
          group_min: this.query.group_min || this.$route.query.group_min,
          time_group: this.query.time_group || this.$route.query.time_group
        }
      })
    },
    computed: {
      filter() {
        return this.$store.getters['filter/filterByUrl'](this.$route.params.id)
      },
      ...mapGetters({
        query: 'filter/query',
        excursions: 'excursion/excursions',
        filters: 'filter/filters',
        isUserloggedIn: 'user/isUserloggedIn'
      })
    },
    methods: {}
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
    position: relative;
    top: 70%;
    justify-content: center;
  }


</style>