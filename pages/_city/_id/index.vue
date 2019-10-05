<template>
  <div>
    <v-card-actions v-if="isUserloggedIn">
      <v-spacer></v-spacer>
      <ExcursionEdit :exc="exc" :cities="cities"></ExcursionEdit>
    </v-card-actions>
    <v-container fluid class="pl-0 pr-0">
      <v-layout>
        <v-flex xs12>
          <div
            :style="{background: 'url(' + exc.mainImage + ') no-repeat 50% 15% /cover'}"
            class="welcome-top">
            <div class="welcome-top__text">{{exc.h1}}</div>
            <v-btn
              v-if="exc.galery"
              text
              @click="showGalery = !showGalery"
              style="font-size: calc(12px + 2 * ((100vw) / 600));"
            >
              <v-icon>insert_photo</v-icon>
              More photo
            </v-btn>
          </div>
          <div v-if="showGalery" class="galery align-center justify-center d-flex"
               @click.self="showGalery = !showGalery">
            <Galery :items="exc.galery" style="max-width: 60%; height: 440px; position: absolute;"/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <div style="margin: 0 5%; display: flex; flex-direction: row">
      <v-container>
        <v-layout>
          <v-flex xs12>
            <ExcursionHeader :exc="exc"/>

            <h2>Overview</h2>
            <div v-html="exc.detailText"/>

            <div v-if="exc.included || exc.excluded">
              <hr>
              <h2>Included/Exclude</h2>
              <div class="d-flex justify-space-between included">
                <div
                  v-if="exc.included"
                  class="d-flex justify-start align-start included-item"
                  style="flex-direction: column"
                >
                  <div
                    class="d-flex align-center"
                    v-for="(incl, i) in exc.included"
                  >
                    <v-icon
                      style="color: rgb(46, 204, 113)"
                      left
                    >done
                    </v-icon>
                    <span
                      :key="i"
                      v-text="incl"
                    />
                  </div>
                </div>
                <div
                  v-if="exc.excluded"
                  class="d-flex justify-start align-start included-item"
                  style="flex-direction: column"
                >
                  <div
                    class="d-flex align-center"
                    v-for="(excl, i) in exc.excluded"
                  >
                    <v-icon
                      style="color: rgb(250, 86, 54)"
                      left
                    >clear
                    </v-icon>
                    <span
                      :key="i"
                      v-text="excl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <Form class="form"/>
    </div>
    <v-container v-if="filtered.length !== 0">
      <v-layout row>
        <v-flex xs12>
          <hr>
          <h2 class="d-flex justify-center">You might also like</h2>
        </v-flex>
      </v-layout>
    </v-container>
    <ExcursionCards :excursions="filtered"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ExcursionHeader from '~/components/Excursion/ExcursionHeader'
  import Galery from '~/components/Galery'
  import ExcursionEdit from '~/components/Excursion/ExcursionEdit'
  import ExcursionCards from "~/components/Excursion/ExcursionCards";
  import Form from "~/components/Form";

  export default {
    async asyncData({store, params, error}) {
      if (store.getters['excursion/excursions'].length === 0) {
        const url = {
          language: store.state.locale,
          city: params.city
        };
        await store.dispatch('excursion/fetchExcursions', url)
        if (store.getters['excursion/excByUrl'](params.id) === undefined) {
          error({statusCode: 404})
        }
      }
      let exc = await store.getters['excursion/excByUrl'](params.id)
      return {exc}
    },
    async fetch({store}) {
      if (store.getters['city/cities'].length === 0) {
        const url = {
          language: store.state.locale
        };
        await store.dispatch('city/fetchCities', url)
      }
    },
    data() {
      return {
        title: 'asd',
        showGalery: false
      }
    },
    head() {
      return {
        title: this.exc.title,
        meta: [
          {hid: 'description', name: 'description', content: this.exc.description}
        ]
      }
    },
    components: {
      ExcursionCards,
      ExcursionHeader,
      Galery,
      ExcursionEdit,
      Form
    },
    computed: {
      isUserloggedIn() {
        return this.$store.getters['user/isUserloggedIn']
      },
      filtered() {
        return this.excursions.filter(item => {
          return item.type === this.exc.type && item.url !== this.exc.url
        })
      },
      ...mapGetters({
        excursions: 'excursion/excursions',
        cities: 'city/cities'
      })
    },
  }
</script>

<style scoped lang="scss">
  h2 {
    margin-top: 25px;
    margin-bottom: 5px;
  }

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

  .included {
    max-width: 600px;

    &-item {
      margin-top: 10px;
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  .form {
    margin-top: 12px;

    @media (max-width: 960px) {
      display: none;
    }
  }
</style>