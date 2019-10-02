<template>
  <div>
    <v-card-actions v-if="isUserloggedIn">
      <v-spacer></v-spacer>
      <CityEdit :city="city"></CityEdit>
    </v-card-actions>
    <v-container fluid class="pl-0 pr-0">
      <v-layout row>
        <v-flex xs12>
          <div
            :style="{background: 'url(' + city.mainImage + ') no-repeat 50% 15% /cover'}"
            class="welcome-top"
          >
            <div class="welcome-top__text">{{city.name}}</div>
            <v-btn
              v-if="city.galery"
              text
              @click="showGalery = !showGalery"
              style="font-size: calc(12px + 2 * ((100vw) / 600));"
            >
              <v-icon>insert_photo</v-icon>
              More photo
            </v-btn>
            <div v-if="showGalery" class="galery align-center justify-center d-flex" @click.self="showGalery =
            !showGalery">
              <Galery :items="city.galery" style="max-width: 60%; max-height: 400px; position: absolute;"/>
            </div>
            <div class="filter">
              <v-chip-group
                multiple
                v-model="filter"
                column
                active-class="green lighten-1"
              >
                <v-chip filter v-for="tag in filterList" :key="tag" :value="tag">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <h2 class="d-flex justify-center" style="font-size: calc(17px + 2 * ((100vw) / 200));">
      {{$t('_city.excursion')}}
    </h2>
    <ExcursionCards :excursions="filtered"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ExcursionCards from "~/components/Excursion/ExcursionCards";
  import Galery from "~/components/Galery";
  import CityEdit from "~/components/City/CityEdit";

  export default {
    async asyncData({store, params, error}) {
      // TODO Сделать условие, чтобы не обращалось каждый раз к бд
      const url = {
        language: store.state.locale,
        city: params.city
      };
      await store.dispatch('excursion/fetchExcursions', url)
      await store.dispatch('city/fetchCities', url)
      if (store.getters['city/cityByUrl'](params.city) === undefined) {
        error({statusCode: 404})
      }
      let city = await store.getters['city/cityByUrl'](params.city)
      return {city}
    },
    data() {
      return {
        showGalery: false,
        filter: [],
        filterList: [],
      }
    },
    created() {
      let arr = this.excursions.map(a => {
        return a.type
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
      Galery,
      CityEdit
    },
    computed: {
      isUserloggedIn() {
        return this.$store.getters['user/isUserloggedIn']
      },
      filtered() {
        if (this.filter.length === 0) return this.excursions
        return this.excursions.filter(item => {
          return this.filter.includes(item.type)
        })
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

  .welcome-top {
    position: relative;
    height: 390px;
    background: url(https://res-5.cloudinary.com/account-travel/image/upload/c_scale,w_auto/c_limit,w_1600/dpr_2/v1/article/183/xcover-landing2.c980ea.jpg.pagespeed.ic.NTuKy7Y2oV.jpg) no-repeat 50% 15% / cover;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
    }

    &__text {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      font-weight: 900;
      color: #fff;
      font-size: calc(20px + 2 * ((100vw) / 100));
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    .filter {
      position: absolute;
      top: 70%;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .galery {
    position: fixed;
    z-index: 9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    margin: 0 auto
  }


</style>