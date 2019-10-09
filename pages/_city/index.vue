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
<!--                      GALERY MORE PHOTO              -->
<!--                      <v-btn-->
<!--                        v-if="city.galery"-->
<!--                        text-->
<!--                        @click="showGalery = !showGalery"-->
<!--                        style="font-size: calc(12px + 2 * ((100vw) / 600)); color: #ffffff; position: absolute; bottom: 5px;-->
<!--                        right: 10px;"-->
<!--                      >-->
<!--                        <svg class="mr-2" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"-->
<!--                             xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">-->
<!--                          <g fill="#FFFFFF">-->
<!--                            <path d="M3.75,22.5C1.682,22.5,0,20.818,0,18.75V8.25C0,6.182,1.682,4.5,3.75,4.5h9.75V3c0-0.827,0.673-1.5,1.5-1.5h3-->
<!--                              c0.827,0,1.5,0.673,1.5,1.5v1.5h0.75C22.318,4.5,24,6.182,24,8.25v10.5c0,2.068-1.682,3.75-3.75,3.75H3.75z M1.5,18.75-->
<!--                              C1.5,19.991,2.509,21,3.75,21h16.5c1.241,0,2.25-1.009,2.25-2.25V16.5h-5.758c-0.869,1.831-2.704,3-4.742,3-->
<!--                              c-2.038,0-3.873-1.169-4.742-3H1.5V18.75z M12,10.5c-2.068,0-3.75,1.682-3.75,3.75C8.25,16.318,9.932,18,12,18-->
<!--                              c2.068,0,3.75-1.682,3.75-3.75C15.75,12.182,14.068,10.5,12,10.5z M22.5,15V8.25C22.5,7.009,21.491,6,20.25,6H3.75-->
<!--                              C2.509,6,1.5,7.009,1.5,8.25V15h5.307c-0.038-0.253-0.057-0.504-0.057-0.75C6.75,11.355,9.105,9,12,9c2.895,0,5.25,2.355,5.25,5.25-->
<!--                              c0,0.246-0.019,0.497-0.057,0.75H22.5z M18,4.5V3h-3l0,1.5H18z"></path>-->
<!--                            <circle cx="18.75" cy="8.25" r="1.125"></circle>-->
<!--                            <path d="M4.5,9C4.086,9,3.75,8.664,3.75,8.25S4.086,7.5,4.5,7.5h2.25c0.414,0,0.75,0.336,0.75,0.75S7.164,9,6.75,9H4.5z"></path>-->
<!--                          </g>-->
<!--                        </svg>-->
<!--                        More photo-->
<!--                      </v-btn>-->
<!--                      <div v-if="showGalery" class="galery align-center justify-center d-flex" @click.self="showGalery =-->
<!--                      !showGalery">-->
<!--                        <Galery :items="city.galery" style="max-width: 60%; height: 440px; position: absolute;"/>-->
<!--                      </div>-->
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
  // const Galery = () => import("~/components/Galery");
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
      // Galery,
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