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
                v-for="(tag, i) in filters"
                :key="i"
                :value="tag.url"
                :disabled="tag.exc_count === 0"
                :to="$i18n.path(`${city.url}/${tag.url}`)"
              >
                {{ tag.name }}
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
    <ExcursionFilter :city="city"/>
    <ExcursionCards :excursions="excursions"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const ExcursionCards = () => import("~/components/Excursion/ExcursionCards");
  const CityEdit = () => import("~/components/City/CityEdit");
  const ExcursionFilter = () => import("~/components/Excursion/Filter");

  export default {
    props: ['city'],
    data() {
      return {
        filter: '',
        showGalery: false,
        filterList: [],
        count: null
      }
    },

    components: {
      ExcursionCards,
      CityEdit,
      ExcursionFilter
    },

    created() {
      this.$router.push({
        path: this.$router.path,
        query: {
          price_min: this.query.price_min || this.$route.query.price_min,
          price_max: this.query.price_max || this.$route.query.price_max,
          group_min: this.query.group_min || this.$route.query.group_min,
          time_min: this.query.time_min || this.$route.query.time_min,
          time_max: this.query.time_max || this.$route.query.time_max
        }
      })
    },
    computed: {
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
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

</style>