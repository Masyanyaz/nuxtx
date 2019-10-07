<template>
  <div>
    <v-card-actions v-if="isUserloggedIn" style="position: absolute; z-index: 9999999; top: 0; right: 0;">
      <v-spacer></v-spacer>
      <ExcursionEdit :exc="exc" :cities="cities"></ExcursionEdit>
    </v-card-actions>
      <v-layout>
        <v-flex xs12>
          <div
            :style="{background: 'url(' + exc.mainImage + ') no-repeat 50% 15% /cover'}"
            class="welcome-top">
<!--            <h1 class="welcome-top__text">{{exc.h1}}</h1>-->
            <v-btn
              v-if="exc.galery"
              text
              @click="showGalery = !showGalery"
              style="font-size: calc(12px + 2 * ((100vw) / 600)); color: #ffffff; position: absolute; bottom: 5px;
              right: 10px;"
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
    <div style="margin: 60px 5% 0; display: flex;">
      <v-container>
        <v-layout>
          <v-flex xs12>
            <h1>{{exc.h1}}</h1>
            <ExcursionHeader :exc="exc"/>

            <h2>Overview</h2>
            <div v-html="exc.detailText"/>

            <div v-if="exc.included || exc.excluded" class="hr">
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
      <div class="d-none d-md-block fix-stop ml-5" style="width: 270px; min-width: 270px;">
        <Form class="form" :exc="exc"/>
      </div>
    </div>
    <v-container class="hr">
      <v-layout row v-if="filtered.length !== 0">
        <v-flex xs12>
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
        let arr = [];
        this.excursions.forEach(a => {
          a.type.forEach(r => {
            this.exc.type.includes(r) && this.exc.url !== a.url ? arr.push(a) : false
          })
        });
        return arr
      },
      ...mapGetters({
        excursions: 'excursion/excursions',
        cities: 'city/cities'
      })
    },
    methods: {
      autoScrollForm() {
        let form = document.querySelector('.form');
        let fixStop = document.querySelector('.fix-stop');
        let heightFixStop = null;
        if (!heightFixStop) heightFixStop = fixStop.getBoundingClientRect().height + 175;

        if (heightFixStop <= 700) return false;

        if (pageYOffset <= 600) {
          form.classList.remove('fix');
        }
        if (pageYOffset >= 600 && pageYOffset <= heightFixStop) {
          form.classList.remove('abs');
          form.style.top = '0';
          form.classList.add('fix');
        }
        if (pageYOffset >= heightFixStop) {
          form.classList.remove('fix');
          form.classList.add('abs');
          form.style.top = `${heightFixStop}px`
        }

      }
    },
    created() {
      if (process.browser) {
        if (window.innerWidth >= 960) {
          window.addEventListener('scroll', this.autoScrollForm)
        }
      }
    },
    beforeDestroy() {
      if (process.browser) {
        window.removeEventListener('scroll', this.autoScrollForm)
      }
    }
  }
</script>

<style scoped lang="scss">
  .fix {
    position: fixed;
    top: 0;
    right: 5%;
    margin-top: 12px;
  }

  .abs {
    position: absolute;
    right: 5%;
  }

  h3 {
    margin-bottom: 10px;
  }

  h2 {
    margin-top: 25px;
    margin-bottom: 15px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 30px;
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

  .included {
    max-width: 600px;

    &-item {
      margin-top: 10px;
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  .hr {
    border-top: 2px solid #D7DCE3;
    margin-top: 25px;
  }
</style>